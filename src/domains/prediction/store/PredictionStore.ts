import { BehaviorSubject, forkJoin, tap } from 'rxjs';
import { SharedApi } from '@PlayAb/shared';

class PredictionStoreClass {
  readonly list$ = new BehaviorSubject<PredictionList>([]);
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
          this.list$.next(list);

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
