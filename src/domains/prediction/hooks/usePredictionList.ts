import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { tap } from 'rxjs';
import { getMTDates, PredictionModel, SharedApi } from '@PlayAb/shared';

const usePredictionList = () => {
  const [list, setList] = useState<PredictionModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError(false);

    const {
      dayStart,
      dayEnd
    } = getMTDates();

    return SharedApi.getPredictions({
      createdAt: {
        $gte: dayStart,
      }
    })
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (list: SetStateAction<PredictionModel[]>) => {
          setList(list);
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
    let wins = 0;
    let losses = 0;
    let placed = 0;
    list.forEach(item => {
      if(item.status === 'Won'){
        wins++
      }else if (item.status === 'Placed'){
        placed++
      }else if (item.status === 'Lost'){
        losses++
      }
    })

    return {
      wins, losses, placed
    }
  }, [list])

  return {
    list,
    loading,
    error,
    reload,
    status
  };
};

export default usePredictionList;
