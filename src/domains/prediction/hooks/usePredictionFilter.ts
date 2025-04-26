import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMTDates } from '@PlayAb/shared';
import { PredictionStore } from '../store/PredictionStore';
import { PredictionStatusModel } from '../../../api/rxjs-client/models/custom.models';

const usePredictionFilter = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const daysOfWeek = useMemo(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], []);
  const [listStatus, setListStatus] = useState<PredictionStatusModel>({} as PredictionStatusModel);

  useEffect(() => {
    const listSubs$ = PredictionStore.list$.subscribe((list) => {
      const status = list.reduce((acc, item) => {
        const key = item.status;
        if (key) {
          acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
      }, {} as PredictionStatusModel);

      setListStatus(status);
    });
    return () => {
      listSubs$.unsubscribe();
    };
  }, []);

  const handleDayClick = useCallback(
    (day: string) => {
      const { dayStartOfWeekDay } = getMTDates();
      const getDay = selectedDay === day ? '' : day;
      const dayStartOfWeek = dayStartOfWeekDay(getDay)?.toISOString() || '';
      setSelectedDay(getDay);
      PredictionStore.reload(dayStartOfWeek);
    },
    [selectedDay]
  );

  return {
    selectedDay,
    handleDayClick,
    daysOfWeek,
    listStatus,
  };
};

export default usePredictionFilter;
