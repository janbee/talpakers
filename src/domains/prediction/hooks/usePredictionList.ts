import { useCallback, useEffect, useState } from 'react';
import { forkJoin, tap } from 'rxjs';
import { getMTDates, PredictionModel, SharedApi } from '@PlayAb/shared';
import { PredictionStatusModel } from '../../../api/rxjs-client/models/custom.models';

const usePredictionList = () => {
  const [list, setList] = useState<PredictionModel[]>([]);
  const [listStatus, setListStatus] = useState<PredictionStatusModel>({} as PredictionStatusModel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError(false);

    const {
      weekStart,
      weekEnd,
      dayStart
    } = getMTDates();


    return forkJoin([SharedApi.getPredictions({
      today: {
        $gte: {
          $date: { $numberLong: dayStart.getTime().toString() }
        }
      }
    }), SharedApi.getPredictions([{
      $match: {
        status: { $in: ['Won', 'Lost', 'Placed'] },
        weekStart: {
          $gte: {
            $date: { $numberLong: weekStart.getTime().toString() }
          },

          $lte: {
            $date: { $numberLong: weekEnd.getTime().toString() }
          }
        }

      }
    }])])
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: ([list, listWithStatuses]) => {
          setList(list);

          const status = listWithStatuses.reduce((acc, item) => {
            const key = item.status;
            if (key) {
              acc[key] = (acc[key] || 0) + 1;
            }
            return acc;
          }, {} as PredictionStatusModel);

          setListStatus(status);
        },
        error: () => setError(true)
      });
  }, []);

  useEffect(() => {
    const predictions$ = reload();
    return () => {
      predictions$.unsubscribe();
    };
  }, [reload]);

  return {
    list,
    loading,
    error,
    reload,
    listStatus
  };
};

export default usePredictionList;
