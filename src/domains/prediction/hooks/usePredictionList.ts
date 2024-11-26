import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { tap } from 'rxjs';
import { getDates, PredictionModel, SharedApi } from '@PlayAb/shared';

const usePredictionList = () => {
  const [list, setList] = useState<PredictionModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError(false);

    return SharedApi.getPredictions({ $limit: 100 })
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
