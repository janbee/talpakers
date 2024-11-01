import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { tap } from 'rxjs';
import { ButtonProps } from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { orderBy } from 'lodash';
import { UserDetailModel, UserStatusModel } from '@PlayAbWeb/api/index';
import { GetDatesUtil, GetUserStatusUtil } from '@PlayAbWeb/common/utils';
import { SharedApi, UserModel } from '@PlayAb/shared';

const useUseUserList = () => {
  const [list, setList] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const user$ = SharedApi.getUsers()
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (list) => setList(list),
        error: () => setError(true),
      });

    return () => {
      user$.unsubscribe();
    };
  }, []);

  const handleOrderByStatus = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
      event.preventDefault();

      setLoading(true);
      setError(false);

      console.log(
        'gaga------------------------asd-------------handleOrderByStatus',
        data,
      );
      console.log(
        'gaga------------------------asd-------------handleOrderByStatus',
        data.filter,
      );
      SharedApi.getUsers()
        .pipe(tap(() => setLoading(false)))
        .subscribe({
          next: (list) => {
            let newList: UserModel[] = list;

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
                ['desc', 'desc'],
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
                ['desc', 'desc'],
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
                ['desc', 'desc'],
              );
            } else if (data.filter === 'nextWithdrawal') {
              newList = orderBy(
                list,
                [
                  (user) => {
                    const maintainCash =
                      user.data.userSession?.autoCashout?.maintainCash ?? 50;
                    const fixedAmount =
                      (user.data.userSession?.autoCashout?.fixedAmount ?? 900) +
                      maintainCash;
                    const cashout = user.data.userSession?.cashout ?? 0;
                    return (cashout / fixedAmount) * 30;
                  },
                ],
                ['desc'],
              );
            } else if (data.filter === 'earnings') {
              newList = orderBy(
                list,
                [
                  (user) => {
                    const { isNewWeek } = GetDatesUtil(user);
                    return isNewWeek
                      ? 0
                      : (user.data?.weekStatus?.betSummary?.betSummary
                          .totalEarnings ?? 0);
                  },
                ],
                ['asc'],
              );
            }
            setList(newList);
          },
          error: () => setError(true),
        });
    },
    [],
  );

  const statusCount = useMemo(() => {
    return {
      [UserStatusModel.IsDone]: userListFilterByStatus(
        list,
        UserStatusModel.IsDone,
      ).length,
      [UserStatusModel.InProgress]: userListFilterByStatus(
        list,
        UserStatusModel.InProgress,
      ).length,
      [UserStatusModel.IsWaiting]: userListFilterByStatus(
        list,
        UserStatusModel.IsWaiting,
      ).length,
    };
  }, [list]);

  const restrictedCount = useMemo(() => {
    return list.filter((item) => item.data.weekStatus?.hasBetRestriction)
      .length;
  }, [list]);

  return {
    list,
    loading,
    error,
    handleOrderByStatus,
    statusCount,
    restrictedCount,
  };
};

const userListFilterByStatus = (list: UserModel[], status: UserStatusModel) => {
  return list.filter((user) => {
    const userStatus = GetUserStatusUtil(user);
    return userStatus === status;
  });
};

export default useUseUserList;
