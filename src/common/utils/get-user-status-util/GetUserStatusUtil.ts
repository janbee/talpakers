import { UserStatusModel } from '../../../api';
import dayjs from 'dayjs';
import { getMTDates, UserSupabaseModel } from '@PlayAb/shared';

const GetUserStatusUtilComponent = (user: UserSupabaseModel) => {
  const { weekStart } = getMTDates();
  const weeklySummary = user.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());

  const isDone = weeklySummary?.data.done === true;
  const inProgress = weeklySummary?.data.done === false;

  const lastUpdate = dayjs(user.updatedAt ?? user.createdAt ?? new Date());
  const minutesPassed = dayjs.duration(-lastUpdate.diff(Date.now())).asMinutes();

  let isIdle = false;

  if (inProgress && minutesPassed >= 30) {
    isIdle = true;
  }

  const waiting = !getMTDates().isWithinThisWeek(weeklySummary?.data.weekStart);
  const isWaiting = waiting || isIdle || weeklySummary?.data.done === undefined;

  if (isWaiting) {
    return UserStatusModel.IsWaiting;
  } else if (isDone) {
    return UserStatusModel.IsDone;
  } else {
    return UserStatusModel.InProgress;
  }
};
export default GetUserStatusUtilComponent;
