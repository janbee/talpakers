import { UserDetailModel, UserStatusModel } from '@api/index.ts';
import { GetDatesUtil } from '@common/utils';
import { differenceInMinutes } from 'date-fns';

const GetUserStatusUtilComponent = (user: UserDetailModel): UserStatusModel => {
  const { weekStart } = GetDatesUtil();
  const isDone = user.data?.weekStatus?.done === true;
  const inProgress = user.data?.weekStatus?.done === false;

  const lastUpdate = user.updatedAt ?? user.createdAt ?? new Date();
  const minutesPassed = -differenceInMinutes(lastUpdate, Date.now());

  let isIdle = false;

  if (inProgress && minutesPassed >= 30) {
    isIdle = true;
  }

  const waiting = weekStart.toISOString() !== user.data?.weekStatus?.startDate;
  const isWaiting = waiting || isIdle || user.data?.weekStatus?.done === undefined;

  if (isWaiting) {
    return UserStatusModel.IsWaiting;
  } else if (isDone) {
    return UserStatusModel.IsDone;
  } else {
    return UserStatusModel.InProgress;
  }
};
export default GetUserStatusUtilComponent;
