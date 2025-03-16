import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { forkJoin, tap } from 'rxjs';
import { getMTDates, PredictionModel, SharedApi } from '@PlayAb/shared';

const usePredictionList = () => {
  const [list, setList] = useState<PredictionModel[]>([]);
  const [statuses, setStatuses] = useState([]);
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
      createdAt: {
        $gte: {
          $date: { $numberLong: dayStart.getTime().toString() }
        }
      }
    }), SharedApi.getPredictions([{
      $match: {
        status: { $in: ['Won', 'Lost', 'Placed'] },
        createdAt: {
          $gte: {
            $date: { $numberLong: weekStart.getTime().toString() }
          },

          $lt: {
            $date: { $numberLong: weekEnd.getTime().toString() }
          }
        }

      }
    }, {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }])])
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: ([list, statuses]: [SetStateAction<PredictionModel[]>, []]) => {
          setList(list);
          setStatuses(statuses);
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

  const status = useMemo(() => {
    const wins = statuses.find(item => item._id === 'Won')?.count ?? 0;
    const losses = statuses.find(item => item._id === 'Lost')?.count ?? 0;
    const placed = statuses.find(item => item._id === 'Placed')?.count ?? 0;


    return {
      wins,
      losses,
      placed
    };
  }, [statuses]);

  return {
    list,
    loading,
    error,
    reload,
    status
  };
};

export default usePredictionList;
