
import {
  BetSummaryModel,
  BonusModel,
  MongoCollection,
  SettledBetModel,
  UserDetailModel,
  WithdrawalModel,
} from '@api/rxjs-client//models/custom.models';
import { catchError, map, Observable, of, Subject, throwError, timeout } from 'rxjs';
import { EJSON } from 'bson';
import { RealmService } from '@api/rxjs-client/apis/realm.service.ts';

class ApiService {
  $RealmDB: RealmService = new RealmService({
    AppId: 'pocketsportsapp-umuum',
    AppClient: 'mongodb-atlas',
    AppDB: 'DB',
  });


  getSettledBets(filter: Record<string, string>) {

    return this.$RealmDB
      .collection(MongoCollection.SettledBets)
      .getBy<SettledBetModel[]>(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getSettledBets'),
        }),
        catchError((err) => {

          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }

  getBetSummary(filter: Record<string, string>): Observable<BetSummaryModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.BetSummary)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getBetSummary'),
        }),
        catchError((err) => {

          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }

  upsertUserData(data: UserDetailModel): Observable<UserDetailModel | null> {
    return this.$RealmDB
      .collection(MongoCollection.User)
      .upsert(data)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! UpsertUserData'),
        }),
        catchError((err) => {

          return of(null);
        }),
      );
  }

  getBonuses(filter: Record<string, string>): Observable<BonusModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.Bonuses)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getBonuses'),
        }),
        catchError((err) => {

          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }

  getWithdrawals(filter: Record<string, string>): Observable<WithdrawalModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.Withdrawals)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getWithdrawals'),
        }),
        catchError((err) => {

          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }

  getUsers(): Observable<UserDetailModel[]> {
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
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }

  getUser(filter: Record<string, string>): Observable<UserDetailModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.User)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () => throwError(() => 'Server is taking too long to respond! getUser'),
        }),
        catchError((err) => {

          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }
}

export default new ApiService();
