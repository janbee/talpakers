import { BehaviorSubject, forkJoin, tap } from 'rxjs';
import { ISODateString, PredictionModel, PredictionSupabaseModel } from '@PlayAb/shared';
import { PredictionStatusModel } from '../../../api/rxjs-client/models/custom.models';
import { SharedApiX } from '@PlayAb/uiServices';
import { SharedApiSupabase } from '@PlayAb/services';

class PredictionStoreClass {
  readonly list$ = new BehaviorSubject<PredictionSupabaseModel[]>([]);
  readonly listWithStatuses$ = new BehaviorSubject<PredictionStatusModel>({} as PredictionStatusModel);
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<boolean>(false);

  reload(day?: Date) {
    this.loading$.next(true);
    this.error$.next(false);

    forkJoin([SharedApiSupabase.getPredictionsByDayWithUserBetInfo(day), SharedApiSupabase.getPredictionsByWeekWithUserBetInfo()])
      .pipe(tap(() => this.loading$.next(false)))
      .subscribe({
        next: ([resPredictionsByDay, resPredictionsByWeek]) => {
          const predictionByDayList = resPredictionsByDay.data || []
          const predictionsByWeek = resPredictionsByWeek.data || []
          this.list$.next(
            predictionByDayList.sort(
              (a, b) => new Date(b.updatedAt || new Date()).getTime() - new Date(a.updatedAt || new Date()).getTime()
            )
          );

          const status = predictionsByWeek.reduce((acc, item) => {
            const key = item.data.status;
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
