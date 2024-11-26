import { UserStatusModel } from '@PlayAbWeb/api/index';
import dayjs from 'dayjs';
import { getUTCDates, UserModel } from '@PlayAb/shared';

const GetUserStatusUtilComponent = (user: UserModel): UserStatusModel => {
  const { weekStart } = getUTCDates();
  const isDone = user.data?.weeklyStatus?.done === true;
  const inProgress = user.data?.weeklyStatus?.done === false;

  const lastUpdate = dayjs(user.updatedAt ?? user.createdAt ?? new Date());
  const minutesPassed = dayjs.duration(-lastUpdate.diff(Date.now())).asMinutes();

  let isIdle = false;

  if (inProgress && minutesPassed >= 30) {
    isIdle = true;
  }

  const waiting = weekStart.toISOString() !== user.data?.weeklyStatus?.startDate;
  const isWaiting = waiting || isIdle || user.data?.weeklyStatus?.done === undefined;

  if (isWaiting) {
    return UserStatusModel.IsWaiting;
  } else if (isDone) {
    return UserStatusModel.IsDone;
  } else {
    return UserStatusModel.InProgress;
  }
};
export default GetUserStatusUtilComponent;
