import { RealmService } from "@services/realm.service";
import { Store } from "@services/store.service";
import {
  AlertTypeModel,
  BetSummaryModel,
  SettledBetsModel,
} from "@models/custom.models";
import { catchError, map, of, throwError, timeout, Observable } from "rxjs";
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
      .collection("settledBets")
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
      .collection("betSummary")
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

  getUsers() {
    console.log("gaga------------------getUsers-------------------");
    return this.$RealmDB
      .collection("user")
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
