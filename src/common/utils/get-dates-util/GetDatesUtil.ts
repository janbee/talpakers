import { UserDetailModel } from '@api/index';

const GetDatesUtil = (user?: UserDetailModel) => {
  const tz = new Date().getTimezoneOffset() * 60000;
  const today = new Date(new Date().getTime() - tz);
  today.setUTCHours(0, 0, 0, 0);

  const currentWeekDay = today.getDay();

  const forWeekStart = new Date(today);
  forWeekStart.setUTCHours(0, 0, 0, 0);
  forWeekStart.setDate(today.getDate() - currentWeekDay);

  const weekStart = new Date(forWeekStart);
  weekStart.setUTCHours(0, 0, 0, 0);

  const forWeekEnd = new Date(weekStart);
  forWeekEnd.setUTCHours(0, 0, 0, 0);
  forWeekEnd.setDate(weekStart.getDate() + 6);

  const weekEnd = new Date(forWeekEnd);
  weekEnd.setUTCHours(23, 59, 59, 999);

  const isNewWeek = weekStart.toISOString() !== user?.data?.weekStatus?.startDate;

  return {
    today,
    weekStart,
    weekEnd,
    isNewWeek,
  };
};

export default GetDatesUtil;
