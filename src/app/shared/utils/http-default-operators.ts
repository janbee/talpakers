import { catchError, EMPTY, map, Observable } from "rxjs";
import { Store } from "@services/store.service";
import { AlertTypeModel } from "@models/custom.models";
import { AjaxResponse } from "rxjs/internal/ajax/AjaxResponse";

export const HttpDefaultOperators = <T>(
  source: Observable<AjaxResponse<T>>,
): Observable<T> => {
  return source.pipe(
    map((res: AjaxResponse<T>) => {
      console.log("gaga-------------------------------------", 1);
      return res.response;
    }),
    catchError((err: Error) => {
      console.log("gaga-------------------------------------", 12312312);
      Store.Alert$.next({
        type: AlertTypeModel.Failed,
        message: err.toString(),
      });
      return EMPTY;
    }),
  );
};
/*.pipe(
	map((res) => res.response),
	catchError((err: Error) => {
		Store.Alert$.next({
			type: AlertTypeModel.Failed,
			message: err.toString(),
		});
		return EMPTY;
	})
);*/
