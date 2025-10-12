import { useCallback, useEffect, useState } from 'react';
import { ActiveGameModel, ISODateString, PredictionModel, PredictionSupabaseModel } from '@PlayAb/shared';
import { PredictionStatusModel } from '../../../api/rxjs-client/models/custom.models';
import { PredictionStore } from '../store/PredictionStore';
import { InitializePubnub } from '../utils/Pubnub';
import { orderBy } from 'lodash';

const usePredictionList = () => {
  const [list, setList] = useState<PredictionSupabaseModel[]>([]);
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

  useEffect(() => {
    const pnCleanup = InitializePubnub((msg: { data: ActiveGameModel[]; date: ISODateString }) => {
      const listByGameId = msg.data.reduce((acc, match) => {
        acc[match.gameId] = match;
        return acc;
      }, {} as any);

      const updatedList = list
        .map((item) => {
          const updatedGame = listByGameId[item._id];

          if (updatedGame) {
            item.data.updatedBet1Rate = updatedGame.bet1Rate;
            item.data.updatedBet2Rate = updatedGame.bet2Rate;
            item.updatedAt = new Date(msg.date).toISOString() as ISODateString;
          }

          return item;
        })

      const sortedList = orderBy(updatedList, ['updatedAt','status'], ['desc']);
      setList(sortedList);
    });

    return () => {
      pnCleanup();
    };
  }, [list]);

  return {
    list,
    loading,
    error,
    reload,
    listStatus,
  };
};

export default usePredictionList;
