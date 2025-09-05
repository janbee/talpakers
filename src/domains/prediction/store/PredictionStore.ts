import { BehaviorSubject, forkJoin, tap } from 'rxjs';
import { ISODateString, PredictionModel, SharedApi } from '@PlayAb/shared';
import { PredictionStatusModel } from '../../../api/rxjs-client/models/custom.models';

class PredictionStoreClass {
  readonly list$ = new BehaviorSubject<PredictionModel[]>([]);
  readonly listWithStatuses$ = new BehaviorSubject<PredictionStatusModel>({} as PredictionStatusModel);
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<boolean>(false);

  reload(day?: ISODateString) {
    this.loading$.next(true);
    this.error$.next(false);

    forkJoin([SharedApi.getDayPredictions(day), SharedApi.getWeeklyPredictions()])
      .pipe(tap(() => this.loading$.next(false)))
      .subscribe({
        next: ([list, listWithStatuses]) => {
          this.list$.next(list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));

          const status = listWithStatuses.reduce((acc, item) => {
            const key = item.status;
            if (key) {
              acc[key] = (acc[key] || 0) + 1;
            }
            return acc;
          }, {} as PredictionStatusModel);
          this.listWithStatuses$.next(status);
        },
        error: () => this.error$.next(true),
      });
  }
}

export const PredictionStore = new PredictionStoreClass();
