import * as Realm from "realm-web";
import {
  catchError,
  defer,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  tap,
} from "rxjs";

class CRUD {
  private collection: globalThis.Realm.Services.MongoDB.MongoDBCollection<any> =
    null as unknown as globalThis.Realm.Services.MongoDB.MongoDBCollection<any>;

  setCollection(
    collection: globalThis.Realm.Services.MongoDB.MongoDBCollection<any>,
  ) {
    this.collection = collection;
  }

  get(_id?: string | number): Observable<any> {
    if (_id) {
      return defer(() => this.collection.find({ _id }));
    }
    return defer(() => this.collection.find({}, { sort: { index: 1 } }));
  }

  getBy(filter: Object): Observable<any> {
    return defer(() => this.collection.find(filter as Record<string, unknown>));
  }

  upsert(object: any) {
    return this.get(object._id).pipe(
      mergeMap((foundItem) => {
        if (foundItem.length) {
          object = merge(foundItem[0], { ...object, updatedAt: new Date() });
        } else {
          object.createdAt = new Date();
          object.updatedAt = undefined;
        }

        return defer(() =>
          this.collection.updateOne(
            { _id: object._id },
            object as unknown as globalThis.Realm.Services.MongoDB.Update,
            {
              upsert: true,
            },
          ),
        ).pipe(
          map(() => {
            return object;
          }),
        );
      }),
    );
  }

  insertMany(array: Array<any>, filter: Object) {
    return this.getBy(filter).pipe(
      mergeMap((resArray) => {
        const ids = resArray.map((item: any) => item._id);
        const filteredArray = array.filter((item) => !ids.includes(item._id));

        if (!filteredArray.length) {
          return of(resArray);
        }

        return defer(() => this.collection.insertMany(filteredArray)).pipe(
          map(() => {
            return [...filteredArray, ...resArray];
          }),
        );
      }),
    );
  }

  delete(filter: Object = {}) {
    return defer(() =>
      this.collection.deleteMany(filter as Record<string, unknown>),
    ).pipe(
      map(() => {
        return null;
      }),
    );
  }
}

export class RealmService {
  public app: Realm.App<globalThis.Realm.DefaultFunctionsFactory, any>;
  private client?: globalThis.Realm.Services.MongoDB;
  private mongoConfig: { AppId: string; AppClient: string; AppDB: string } =
    {} as any;
  private readonly CRUD: CRUD;

  constructor(mongoConfig: {
    AppId: string;
    AppClient: string;
    AppDB: string;
  }) {
    this.mongoConfig.AppId = mongoConfig.AppId;
    this.mongoConfig.AppClient = mongoConfig.AppClient;
    this.mongoConfig.AppDB = mongoConfig.AppDB;
    this.app = new Realm.App({
      id: this.mongoConfig.AppId,
    });

    this.CRUD = new CRUD();
  }

  init() {
    const credentials = Realm.Credentials.anonymous();
    return defer(() => this.app?.logIn(credentials)).pipe(
      catchError((err): any => {
        console.error("Failed to log in", err);
        return of(err);
      }),
      tap(() => {
        this.client = this.app?.currentUser?.mongoClient(
          this.mongoConfig.AppClient,
        );
      }),
    );
  }

  collection(name: unknown) {
    const collection = this.client
      ?.db(this.mongoConfig.AppDB)
      .collection(name as unknown as string);
    this.CRUD.setCollection(
      collection as globalThis.Realm.Services.MongoDB.MongoDBCollection<any>,
    );
    return this.CRUD;
  }
}
