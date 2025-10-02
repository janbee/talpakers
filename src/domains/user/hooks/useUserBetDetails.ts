import { useEffect, useMemo, useState } from 'react';
import { PredictionModel, UserModel } from '@PlayAb/shared';
import { Dictionary } from 'lodash';
import { SharedApiX } from '@PlayAb/uiServices';

const useUserBetDetails = (user: UserModel) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [predictionDictionary, setPredictionDictionary] = useState<Dictionary<PredictionModel> | undefined>(undefined);

  useEffect(() => {
    const betsInfo = user.data.weeklyStatus?.betSummary.betsInfo || [];

    console.log('gaga---------------betsInfo----------------------', betsInfo);
    const gameIds = betsInfo.map((bet) => bet.gameId);
    const subs = SharedApiX.getPredictionByGameIds(gameIds).subscribe((list) => {
      setLoading(false);

      const dictionaryPredictions = list.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {} as Dictionary<PredictionModel>);

      console.log('gaga------dictionaryPredictions-------------------------------', dictionaryPredictions);

      setPredictionDictionary(dictionaryPredictions);
    });

    return () => {
      subs.unsubscribe();
    };
  }, [user]);

  const listStatus = useMemo(() => {
    const betsInfo = user.data.weeklyStatus?.betSummary.betsInfo || [];
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
    }
  }, [user]);

  return {
    predictionDictionary,
    loading,
    listStatus
  };
};

export default useUserBetDetails;
