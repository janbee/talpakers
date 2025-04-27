import { useEffect, useState } from 'react';
import { PredictionModel, SharedApi, UserModel } from '@PlayAb/shared';
import { Dictionary } from 'lodash';
import { PredictionStatusModel } from '../../../api/rxjs-client/models/custom.models';

const useUserBetDetails = (user: UserModel) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [predictionDictionary, setPredictionDictionary] = useState<Dictionary<PredictionModel> | undefined>(undefined);
  const [listStatus, setListStatus] = useState<PredictionStatusModel>({} as PredictionStatusModel);

  useEffect(() => {
    const betsInfo = user.data.weeklyStatus?.betSummary.betsInfo || [];
    const gameIds = betsInfo.map((bet) => bet.gameId);
    const subs = SharedApi.getPredictionByGameIds(gameIds).subscribe((list) => {
      setLoading(false);

      const status = list.reduce((acc, item) => {
        const key = item.status;
        if (key) {
          acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
      }, {} as PredictionStatusModel);

      const dictionaryPredictions = list.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {} as Dictionary<PredictionModel>);

      console.log('gaga-------------------------------------', dictionaryPredictions);

      setPredictionDictionary(dictionaryPredictions);
      setListStatus(status);
    });

    return () => {
      subs.unsubscribe();
    };
  }, [user]);

  return {
    predictionDictionary,
    loading,
    listStatus,
  };
};

export default useUserBetDetails;
