import { UserDetailModel, UserStatusModel } from '@api/index';
import { GetDatesUtil } from '@common/utils';
import dayjs from 'dayjs';

const GetUserStatusUtilComponent = (user: UserDetailModel): UserStatusModel => {
  const { weekStart } = GetDatesUtil();
  const isDone = user.data?.weekStatus?.done === true;
  const inProgress = user.data?.weekStatus?.done === false;

  const lastUpdate = dayjs(user.updatedAt ?? user.createdAt ?? new Date());
  const minutesPassed = dayjs.duration(-lastUpdate.diff(Date.now())).asMinutes();

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
