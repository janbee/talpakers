import { SetStateAction, useCallback, useEffect, useState } from 'react';
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
        $lt: dayEnd
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

  return {
    list,
    loading,
    error,
    reload
  };
};

export default usePredictionList;
