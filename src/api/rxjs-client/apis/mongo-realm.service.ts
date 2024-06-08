
import { isUndefined, mergeWith } from 'lodash';
import * as Realm from "realm-web";
import { MongoCollection } from '@api/rxjs-client/models/custom.models.ts';
import { catchError, defer, map, mergeMap, Observable, of, tap } from 'rxjs';


interface UpsertModel {
  _id: string;
  createdAt: Date;
  updatedAt?: Date;
  owner_id: string;
  email: string;
  year: number;
}

export class CRUD {
  private collection: globalThis.Realm.Services.MongoDB.MongoDBCollection<UpsertModel> =
    null as unknown as globalThis.Realm.Services.MongoDB.MongoDBCollection<UpsertModel>;

  private currentUserId = '';
  private currentUserEmail = '';

  setCollection(collection: globalThis.Realm.Services.MongoDB.MongoDBCollection<UpsertModel>) {
    this.collection = collection;
  }

  setCurrentUser(currentUserId: string, currentUserEmail: string) {
    this.currentUserId = currentUserId;
    this.currentUserEmail = currentUserEmail;
  }

  get<T>(_id?: string | number) {
    if (_id) {
      return defer(() => this.collection.find({ _id })) as Observable<T[]>;
    }
    return defer(() => this.collection.find({}, { sort: { index: 1 } })) as Observable<T[]>;
  }

  getBy<T>(filter: Record<string, string>) {
    return defer(() => this.collection.find(filter)) as Observable<T[]>;
  }

  upsert<T>(object: UpsertModel) {
    return this.get<T>(object._id.toLowerCase()).pipe(
      mergeMap((foundItem) => {
        if (foundItem.length) {
          if (object.updatedAt) {
            object = mergeWith(
              foundItem[0],
              object,
              (a: Record<string, string>, b) => {
                return (isUndefined(b) === undefined ? a : undefined);
              });
          } else {
            object = mergeWith(
              foundItem[0],
              { ...object, updatedAt: new Date() },
              (a: Record<string, string>, b) => {
                return isUndefined(b) === undefined ? a : undefined;
              },
            );
          }
        } else {
          object.createdAt = new Date();
          object.updatedAt = undefined;
        }

        const year = new Date().getFullYear();

        object.owner_id = this.currentUserId;
        object.email = this.currentUserEmail;
        object.year = year;

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

  delete(filter: Record<string, string> = {}) {
    return defer(() => this.collection.deleteMany(filter as Record<string, unknown>)).pipe(
      map(() => {
        return null;
      }),
    );
  }
}

export class MongoRealmService {
  public app: Realm.App<globalThis.Realm.DefaultFunctionsFactory, SimpleObject>;
  private client: globalThis.Realm.Services.MongoDB | undefined;
  private mongoConfig: Record<string, string> = {};
  private collections: Record<string, { CRUD: CRUD }> = {};

  constructor(mongoConfig: { AppId: string; AppClient: string; AppDB: string }) {
    this.mongoConfig.AppId = mongoConfig.AppId;
    this.mongoConfig.AppClient = mongoConfig.AppClient;
    this.mongoConfig.AppDB = mongoConfig.AppDB;
    this.app = new Realm.App({
      id: this.mongoConfig.AppId,
    });
  }

  init() {
    const credentials = Realm.Credentials.emailPassword('admin@talpak.com', '--------');

    return defer(() => this.app.logIn(credentials)).pipe(
      catchError((err) => {

        console.error('Failed to log in', err);
        return of(err);
      }),
      tap(() => {
        if (this.app.currentUser)
          this.client = this.app.currentUser.mongoClient(this.mongoConfig.AppClient);
      }),
    );
  }

  login(email: string, password: string) {
    const credentials = Realm.Credentials.emailPassword(email.toLowerCase(), password);

    return defer(() => this.app.logIn(credentials)).pipe(
      tap(() => {
        if (this.app.currentUser)
          this.client = this.app.currentUser.mongoClient(this.mongoConfig.AppClient);
      }),
      map(() => this.app.currentUser?.profile.email),
      catchError((err) => {
        console.error('Failed to log in', err);
        return of(err);
      }),
    );
  }

  isLogin() {
    return of(!!this.app?.currentUser?.profile.email);
  }

  collection(name: MongoCollection) {
    const crud = new CRUD();
    const collection = this.client?.db(this.mongoConfig.AppDB).collection(name);
    if (collection) {
      crud.setCollection(collection as globalThis.Realm.Services.MongoDB.MongoDBCollection<UpsertModel>);
    }
    this.collections[name] = {
      CRUD: crud,
    };

    this.collections[name].CRUD.setCurrentUser(this.app.currentUser?.id ?? '', this.app.currentUser?.profile?.email ?? '');
    return this.collections[name].CRUD;
  }
}
