import { UserStatusModel } from '../../../api/rxjs-client/models/custom.models';
import dayjs from 'dayjs';
import { getMTDates, UserModel } from '@PlayAb/shared';

const GetUserStatusUtilComponent = (user: UserModel): UserStatusModel => {
  const isDone = user.data?.weeklyStatus?.done === true;
  const inProgress = user.data?.weeklyStatus?.done === false;

  const lastUpdate = dayjs(user.updatedAt ?? user.createdAt ?? new Date());
  const minutesPassed = dayjs.duration(-lastUpdate.diff(Date.now())).asMinutes();

  let isIdle = false;

  if (inProgress && minutesPassed >= 30) {
    isIdle = true;
  }


  const waiting = !getMTDates().isWithinThisWeek(user.data?.weeklyStatus?.startDate);
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
