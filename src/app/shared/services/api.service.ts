import { RealmService } from "@services/realm.service";
import { Store } from "@services/store.service";
import {
  AlertTypeModel,
  BetSummaryModel,
  BonusModel,
  MongoCollection,
  SettledBetModel,
  UserDetailModel,
  WithdrawalModel,
} from "@models/custom.models";
import { catchError, map, Observable, of, throwError, timeout } from "rxjs";
import { EJSON } from "bson";

class ApiService {
  $RealmDB = new RealmService({
    AppId: "pocketsportsapp-umuum",
    AppClient: "mongodb-atlas",
    AppDB: "DB",
  });

  private static catchErrorAlert(err: any) {
    Store.Alert$.next({
      type: AlertTypeModel.Failed,
      message: err.toString(),
      duration: 7000,
    });
  }

  getSettledBets(filter: Object): Observable<SettledBetModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.SettledBets)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () =>
            throwError(
              () => "Server is taking too long to respond! getSettledBets",
            ),
        }),
        catchError((err) => {
          ApiService.catchErrorAlert(err);
          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }

  getBetSummary(filter: Object): Observable<BetSummaryModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.BetSummary)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () =>
            throwError(
              () => "Server is taking too long to respond! getBetSummary",
            ),
        }),
        catchError((err) => {
          ApiService.catchErrorAlert(err);
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
          with: () =>
            throwError(
              () => "Server is taking too long to respond! UpsertUserData",
            ),
        }),
        catchError((err) => {
          ApiService.catchErrorAlert(err);
          return of(null);
        }),
      );
  }

  getBonuses(filter: Object): Observable<BonusModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.Bonuses)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () =>
            throwError(
              () => "Server is taking too long to respond! getBonuses",
            ),
        }),
        catchError((err) => {
          ApiService.catchErrorAlert(err);
          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }

  getWithdrawals(filter: Object): Observable<WithdrawalModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.Withdrawals)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () =>
            throwError(
              () => "Server is taking too long to respond! getWithdrawals",
            ),
        }),
        catchError((err) => {
          ApiService.catchErrorAlert(err);
          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
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
          with: () =>
            throwError(() => "Server is taking too long to respond! getUsers"),
        }),
        catchError((err) => {
          ApiService.catchErrorAlert(err);
          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }

  getUser(filter: Object): Observable<UserDetailModel[] | null> {
    return this.$RealmDB
      .collection(MongoCollection.User)
      .getBy(filter)
      .pipe(
        timeout({
          each: 10000,
          with: () =>
            throwError(() => "Server is taking too long to respond! getUser"),
        }),
        catchError((err) => {
          ApiService.catchErrorAlert(err);
          return of(null);
        }),
        map((res) => {
          return EJSON.parse(JSON.stringify(res));
        }),
      );
  }
}

export const API = new ApiService();
