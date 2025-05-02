import { useCallback, useEffect, useState } from 'react';
import { PredictionModel } from '@PlayAb/shared';
import { PredictionStatusModel } from '../../../api/rxjs-client/models/custom.models';
import { PredictionStore } from '../store/PredictionStore';

const usePredictionList = () => {
  const [list, setList] = useState<PredictionModel[]>([]);
  const [listStatus, setListStatus] = useState<PredictionStatusModel>({} as PredictionStatusModel);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reload = useCallback(() => {
    PredictionStore.reload();
  }, []);

  useEffect(() => {
    const loading$ = PredictionStore.loading$.subscribe(setLoading);
    const listSubs$ = PredictionStore.list$.subscribe(setList);
    const listWithStatuses$ = PredictionStore.listWithStatuses$.subscribe(setListStatus);
    const error$ = PredictionStore.error$.subscribe(setError);
    reload();
    return () => {
      loading$.unsubscribe();
      listSubs$.unsubscribe();
      listWithStatuses$.unsubscribe();
      error$.unsubscribe();
    };
  }, [reload]);

  return {
    list,
    loading,
    error,
    reload,
    listStatus,
  };
};

export default usePredictionList;
