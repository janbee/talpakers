import { AlertModel, UserModel } from "@app/shared/models/custom.models";
import { BehaviorSubject, Subject } from "rxjs";

class StoreService {
  Hash = "";
  Alert$ = new Subject<AlertModel>();
  Loading$ = new BehaviorSubject<boolean>(false);
  User$ = new Subject<UserModel>();
}

export const Store = new StoreService();
