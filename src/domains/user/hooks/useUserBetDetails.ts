import { useEffect, useMemo, useState } from 'react';
import { PredictionModel, UserSupabaseModel } from '@PlayAb/shared';
import { Dictionary } from 'lodash';
import { SharedApiX } from '@PlayAb/uiServices';

const useUserBetDetails = (user: UserSupabaseModel) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [predictionDictionary, setPredictionDictionary] = useState<Dictionary<PredictionModel> | undefined>(undefined);

  const betsInfo = useMemo(() => {
    const betSummary = user.data.betsSummary?.[0];
    return betSummary?.data.betsInfo || [];
  }, [user.data.betsSummary]); // The dependency is the part of the user object that affects the calculation

  useEffect(() => {
    const gameIds = betsInfo.map((bet) => bet.gameId);
    const subs = SharedApiX.getPredictionByGameIds(gameIds).subscribe((list) => {
      setLoading(false);

      const dictionaryPredictions = list.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {} as Dictionary<PredictionModel>);

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
