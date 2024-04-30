import * as Realm from 'realm-web';
import { catchError, defer, map, mergeMap, Observable, of, tap } from 'rxjs';
import { MongoCollection } from '@models/custom.models';

import moment from 'moment';
import { isUndefined, mergeWith } from 'lodash';

class CRUD {
  private collection: globalThis.Realm.Services.MongoDB.MongoDBCollection<any> =
    null as unknown as globalThis.Realm.Services.MongoDB.MongoDBCollection<any>;

  private currentUserId: any;
  private currentUserEmail: any;

  setCollection(collection: globalThis.Realm.Services.MongoDB.MongoDBCollection<any>) {
    this.collection = collection;
  }

  setCurrentUser(currentUserId: any, currentUserEmail: string) {
    this.currentUserId = currentUserId;
    this.currentUserEmail = currentUserEmail;
  }

  get(_id?: string | number): Observable<any> {
    if (_id) {
      return defer(() => this.collection.find({ _id }));
    }
    return defer(() => this.collection.find({}, { sort: { index: 1 } }));
  }

  getBy(filter: Record<string, unknown>): Observable<any> {
    return defer(() => this.collection.find(filter));
  }

  upsert(object: any) {
    return this.get(object._id.toLowerCase()).pipe(
      mergeMap((foundItem) => {
        if (foundItem.length) {
          console.log('gaga-------------------------------------', object.updatedAt);

          if (object.updatedAt) {
            object = mergeWith(foundItem[0], object, (a, b) => (isUndefined(b) ? a : undefined));
          } else {
            object = mergeWith(foundItem[0], { ...object, updatedAt: new Date() }, (a, b) =>
              isUndefined(b) ? a : undefined
            );
          }
        } else {
          object.createdAt = new Date();
          object.updatedAt = undefined;
        }

        const year = parseInt(moment().format('YYYY'), 10);

        object.owner_id = this.currentUserId;
        object.email = this.currentUserEmail;
        object.year = year;

        console.log('gaga----------------------------------1--final data to update', JSON.stringify(object, null, 2));
        return defer(() =>
          this.collection.updateOne(
            { _id: object._id },
            object as unknown as globalThis.Realm.Services.MongoDB.Update,
            {
              upsert: true,
            }
          )
        ).pipe(
          map(() => {
            return object;
          })
        );
      })
    );
  }

  insertMany(array: Array<any>, filter: Record<string, unknown>) {
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
          })
        );
      })
    );
  }

  delete(filter: Object = {}) {
    return defer(() => this.collection.deleteMany(filter as Record<string, unknown>)).pipe(
      map(() => {
        return null;
      })
    );
  }
}

export class RealmService {
  public app: Realm.App<globalThis.Realm.DefaultFunctionsFactory, any>;
  private client?: globalThis.Realm.Services.MongoDB;
  private mongoConfig: { AppId: string; AppClient: string; AppDB: string } = {} as any;
  private collections: any = {};

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
    return defer(() => this.app?.logIn(credentials)).pipe(
      catchError((err): any => {
        console.error('Failed to log in', err);
        return of(err);
      }),
      tap(() => {
        this.client = this.app?.currentUser?.mongoClient(this.mongoConfig.AppClient);
      })
    );
  }

  login(email: string, password: string) {
    const credentials = Realm.Credentials.emailPassword(email.toLowerCase(), password);

    return defer(() => this.app?.logIn(credentials)).pipe(
      tap(() => {
        this.client = this.app?.currentUser?.mongoClient(this.mongoConfig.AppClient);
      }),
      map(() => this.app?.currentUser?.profile?.email),
      catchError((err): any => {
        console.error('Failed to log in', err);
        return of(err);
      })
    );
  }

  isLogin() {
    return of(!!this.app?.currentUser?.profile?.email);
  }

  collection(name: MongoCollection) {
    const crud = new CRUD();
    const collection = this.client?.db(this.mongoConfig.AppDB).collection(name as unknown as string);
    crud.setCollection(collection as globalThis.Realm.Services.MongoDB.MongoDBCollection<any>);
    this.collections[name] = {
      CRUD: crud,
    };

    this.collections[name].CRUD.setCurrentUser(this.app.currentUser?.id, this.app.currentUser?.profile?.email || '');
    return this.collections[name].CRUD;
  }
}
