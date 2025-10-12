import { useEffect, useMemo, useState } from 'react';
import { PredictionSupabaseModel, UserSupabaseModel } from '@PlayAb/shared';
import { Dictionary } from 'lodash';
import { SharedApiSupabase } from '@PlayAb/services';

const useUserBetDetails = (user: UserSupabaseModel) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [predictionDictionary, setPredictionDictionary] = useState<Dictionary<PredictionSupabaseModel> | undefined>(
    undefined
  );

  const betsInfo = useMemo(() => {
    const betSummary = user.data.betsSummary?.[0];
    return betSummary?.data.betsInfo || [];
  }, [user.data.betsSummary]); // The dependency is the part of the user object that affects the calculation

  useEffect(() => {
    const gameIds = betsInfo.map((bet) => bet.gameId);

    console.log('gameIds-------------------------------------', gameIds);
    const subs = SharedApiSupabase.getPredictionsByGameIds(gameIds).subscribe((res) => {
      const list = res.data || [];
      setLoading(false);

      const dictionaryPredictions = list.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {} as Dictionary<PredictionSupabaseModel>);

      setPredictionDictionary(dictionaryPredictions);
    });

    return () => {
      subs.unsubscribe();
    };
  }, [betsInfo, user]);

  const listStatus = useMemo(() => {
    let Won = 0;
    let Lost = 0;
    betsInfo.forEach((bet) => {
      if (bet.status === 'Won') {
        Won++;
      } else if (bet.status === 'Lost') {
        Lost++;
      }
    });

    return {
      Won,
      Lost,
    };
  }, [betsInfo]);

  return {
    predictionDictionary,
    loading,
    listStatus,
  };
};

export default useUserBetDetails;
