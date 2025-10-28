import { useEffect, useMemo, useState } from 'react';
import { BetInfoModel, getMTDates, PredictionSupabaseModel, UserSupabaseModel } from '@PlayAb/shared';
import { Dictionary } from 'lodash';
import { SharedApiSupabase } from '@PlayAb/services';
import { mergeMap } from 'rxjs';

const useUserBetDetails = (user: UserSupabaseModel) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [betsInfo, setBetsInfo] = useState<BetInfoModel[]>([]);
  const [predictionDictionary, setPredictionDictionary] = useState<Dictionary<PredictionSupabaseModel> | undefined>(
    undefined
  );

  useEffect(() => {
    const { weekStart } = getMTDates();
    const subs = SharedApiSupabase.getWeeklySummaryByWeek(user._id, weekStart.toISOString())
      .pipe(
        mergeMap((res) => {
          const weeklySummary = res.data?.[0];
          const betsInfo = weeklySummary?.data.betsInfo || [];
          setBetsInfo(betsInfo);
          const gameIds = betsInfo.map((bet) => bet.gameId);
          return SharedApiSupabase.getPredictionsByGameIds(gameIds);
        })
      )
      .subscribe((res) => {
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
  }, [user]);

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
    betsInfo,
    predictionDictionary,
    loading,
    listStatus,
  };
};

export default useUserBetDetails;
