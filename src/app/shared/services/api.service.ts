import { RealmService } from "@services/realm.service";
import { Store } from "@services/store.service";
import {
  AlertTypeModel,
  BetSummaryModel,
  BonusModel,
  MongoCollection,
  SettledBetsModel,
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

  getSettledBets(filter: Object): Observable<SettledBetsModel[] | null> {
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
}

export const API = new ApiService();
