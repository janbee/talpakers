import { useCallback, useEffect, useState } from 'react';
import { tap } from 'rxjs';
import { API, UserDetailModel, UserStatusModel } from '@api/index.ts';
import { ButtonProps } from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { orderBy } from 'lodash';
import { GetUserStatusUtil } from '@common/utils';
import * as React from 'react';

const useUseUserList = () => {
  const [list, setList] = useState<UserDetailModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusCount, setStatusCount] = useState({
    [UserStatusModel.IsDone]: 0,
    [UserStatusModel.InProgress]: 0,
    [UserStatusModel.IsWaiting]: 0,
  });

  useEffect(() => {
    setLoading(true);
    setError(false);

    const user$ = API.getUsers()
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (list) => {
          setStatusCount({
            [UserStatusModel.IsDone]: userListFilterByStatus(list, UserStatusModel.IsDone).length,
            [UserStatusModel.InProgress]: userListFilterByStatus(list, UserStatusModel.InProgress).length,
            [UserStatusModel.IsWaiting]: userListFilterByStatus(list, UserStatusModel.IsWaiting).length,
          });
          setList(list);
        },
        error: () => setError(true),
      });

    return () => {
      user$.unsubscribe();
    };
  }, []);

  const handleOrderByStatus = useCallback((event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    event.preventDefault();

    setLoading(true);
    setError(false);

    API.getUsers()
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (list) => {
          let newList: UserDetailModel[] = list;

          if (data.filter === UserStatusModel.IsDone) {
            newList = orderBy(
              list,
              [
                (user) => {
                  const userStatus = GetUserStatusUtil(user);
                  return userStatus === UserStatusModel.IsDone;
                },
                (user) => user.updatedAt ?? user.createdAt,
              ],
              ['desc', 'desc']
            );
          } else if (data.filter === UserStatusModel.InProgress) {
            newList = orderBy(
              list,
              [
                (user) => {
                  const userStatus = GetUserStatusUtil(user);
                  return userStatus === UserStatusModel.InProgress;
                },
                'data.weekStatus.betSummary.betSummary.totalStaked',
              ],
              ['desc', 'desc']
            );
          } else if (data.filter === UserStatusModel.IsWaiting) {
            newList = orderBy(
              list,
              [
                (user) => {
                  const userStatus = GetUserStatusUtil(user);
                  return userStatus === UserStatusModel.IsWaiting;
                },
                (user) => user.updatedAt ?? user.createdAt,
              ],
              ['desc', 'desc']
            );
          }

          setStatusCount({
            [UserStatusModel.IsDone]: userListFilterByStatus(newList, UserStatusModel.IsDone).length,
            [UserStatusModel.InProgress]: userListFilterByStatus(newList, UserStatusModel.InProgress).length,
            [UserStatusModel.IsWaiting]: userListFilterByStatus(newList, UserStatusModel.IsWaiting).length,
          });
          setList(newList);
        },
        error: () => setError(true),
      });
  }, []);

  return { list, loading, error, handleOrderByStatus, statusCount };
};

const userListFilterByStatus = (list: UserDetailModel[], status: UserStatusModel) => {
  return list.filter((user) => {
    const userStatus = GetUserStatusUtil(user);
    return userStatus === status;
  });
};

export default useUseUserList;
