import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { tap } from 'rxjs';
import { getDates, SharedApi } from '@PlayAb/shared';
import { PredictionModel } from '../../../api/rxjs-client/models/custom.models';

const usePredictionList = () => {
  const [list, setList] = useState<PredictionModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    setError(false);

    const { today } = getDates();

    return SharedApi.getPredictions({ today: { $eq: today } })
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
