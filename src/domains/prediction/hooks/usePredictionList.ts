import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { tap } from 'rxjs';
import { API, PredictionModel } from '@api/index';

const usePredictionList = () => {
  const [list, setList] = useState<PredictionModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError(false);

    return API.getPredictions()
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (list: SetStateAction<PredictionModel[]>) => {
          setList(list);
        },
        error: () => setError(true),
      });
  }, []);

  useEffect(() => {
    const predictions$ = reload();
    return () => {
      predictions$.unsubscribe();
    };
  }, [reload]);

  return { list, loading, error, reload };
};

export default usePredictionList;
