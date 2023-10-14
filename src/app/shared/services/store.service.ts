import { AlertModel } from "@app/shared/models/custom.models";
import { BehaviorSubject, Subject } from "rxjs";

class StoreService {
  Hash = "";
  Alert$ = new Subject<AlertModel>();
  Loading$ = new BehaviorSubject<boolean>(false);
}

export const Store = new StoreService();
