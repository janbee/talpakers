import {
  BetSummaryModel,
  BonusModel,
  MongoCollection,
  SettledBetModel,
  UserDetailModel,
  WithdrawalModel,
} from '@api/rxjs-client//models/custom.models';
import { catchError, map, throwError, timeout } from 'rxjs';
import { EJSON } from 'bson';
import { MongoRealmService } from './mongo-realm.service';

class ApiService {
  $RealmDB = new MongoRealmService({
    AppId: 'pocketsportsapp-umuum',
    AppClient: 'mongodb-atlas',
    AppDB: 'DB',
  });


  getSettledBets(filter: Record<string, string>) {

    return this.$RealmDB
      .collection(MongoCollection.SettledBets)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getSettledBets'),
        }),
        catchError((err) => {

          return throwError(() => `Server is taking too long to respond! getSettledBets ${err}`);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res)) as SettledBetModel[];
        }),
      );
  }

  getBetSummary(filter: Record<string, string>) {
    return this.$RealmDB
      .collection(MongoCollection.BetSummary)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getBetSummary'),
        }),
        catchError((err) => {
          return throwError(() => `Server is taking too long to respond! getBetSummary ${err}`);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res)) as BetSummaryModel[];
        }),
      );
  }

  upsertUserData(data: UserDetailModel) {
    return this.$RealmDB
      .collection(MongoCollection.User)
      .upsert(data as never)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! UpsertUserData'),
        }),
        catchError((err) => {
          return throwError(() => `Server is taking too long to respond! UpsertUserData ${err}`);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res)) as UserDetailModel;
        }),
      );
  }

  getBonuses(filter: Record<string, string>) {
    return this.$RealmDB
      .collection(MongoCollection.Bonuses)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getBonuses'),
        }),
        catchError((err) => {
          return throwError(() => `Server is taking too long to respond! getBonuses ${err}`);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res)) as BonusModel[];
        }),
      );
  }

  getWithdrawals(filter: Record<string, string>) {
    return this.$RealmDB
      .collection(MongoCollection.Withdrawals)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getWithdrawals'),
        }),
        catchError((err) => {

          return throwError(() => `Server is taking too long to respond! getWithdrawals ${err}`);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res)) as WithdrawalModel[];
        }),
      );
  }

  getUsers() {
    return this.$RealmDB
      .collection(MongoCollection.User)
      .get()
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getUsers'),
        }),
        catchError((err) => {

          return throwError(() => `Server is taking too long to respond! getUsers ${err}`);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res)) as UserDetailModel[];
        }),
      );
  }

  getUser(filter: Record<string, string>) {
    return this.$RealmDB
      .collection(MongoCollection.User)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getUser'),
        }),
        catchError((err) => {

          return throwError(() => `Server is taking too long to respond! getUser ${err}`);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res)) as UserDetailModel[];
        }),
      );
  }
}

export default new ApiService();
