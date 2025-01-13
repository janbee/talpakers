import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { forkJoin, tap } from 'rxjs';
import { ButtonProps } from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { orderBy } from 'lodash';
import { UserStatusModel } from '@PlayAbWeb/api/index';
import { GetDatesUtil, GetUserStatusUtil } from '@PlayAbWeb/common/utils';
import { SharedApi, UserModel } from '@PlayAb/shared';

const useUseUserList = () => {
  const [list, setList] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateUser = (users: UserModel[], listFailedUpdate: UserModel[]) => {
    const fails = listFailedUpdate.map(user => user.build);
    users.forEach(user => {
      if (fails.includes(user.build) && user.data.weeklyStatus) {
        user.data.weeklyStatus.mongoUpdateFailed = true;
      }
    });
    return users;
  };

  useEffect(() => {
    setLoading(true);
    setError(false);


    const user$ = forkJoin([SharedApi.getUsers(), SharedApi.getUsers({ '_id__baas_transaction': { $exists: true } })]).pipe(tap(() => setLoading(false)))
      .subscribe({
        next: ([list, listFailedUpdate]) => {
          setList(updateUser(list, listFailedUpdate));
        },
        error: () => setError(true)
      });


    return () => {
      user$.unsubscribe();
    };
  }, []);

  const handleOrderByStatus = useCallback((event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    event.preventDefault();

    setLoading(true);
    setError(false);


    forkJoin([SharedApi.getUsers(), SharedApi.getUsers({ '_id__baas_transaction': { $exists: true } })])
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: ([list, listFailedUpdate]) => {
          let newList: UserModel[] = list;

          if (data.filter === UserStatusModel.IsDone) {
            newList = orderBy(list, [(user) => {
              const userStatus = GetUserStatusUtil(user);
              return userStatus === UserStatusModel.IsDone;
            }, (user) => user.updatedAt ?? user.createdAt], ['desc', 'desc']);
          } else if (data.filter === UserStatusModel.InProgress) {
            newList = orderBy(list, [(user) => {
              const userStatus = GetUserStatusUtil(user);
              return userStatus === UserStatusModel.InProgress;
            }, 'data.weeklyStatus.betSummary.betSummary.totalStaked'], ['desc', 'desc']);
          } else if (data.filter === UserStatusModel.IsWaiting) {
            newList = orderBy(list, [(user) => {
              const userStatus = GetUserStatusUtil(user);
              return userStatus === UserStatusModel.IsWaiting;
            }, (user) => user.updatedAt ?? user.createdAt], ['desc', 'desc']);
          } else if (data.filter === 'nextWithdrawal') {
            newList = orderBy(list, [(user) => {
              const maintainCash = user.data.userSession?.autoCashout?.maintainCash ?? 50;
              const fixedAmount = (user.data.userSession?.autoCashout?.fixedAmount ?? 900) + maintainCash;
              const cashout = user.data.userSession?.cashout ?? 0;
              return (cashout / fixedAmount) * 30;
            }], ['desc']);
          } else if (data.filter === 'earnings') {
            newList = orderBy(list, [(user) => {
              const { isNewWeek } = GetDatesUtil(user);
              console.log('gaga-------------------------------------', user.data?.weeklyStatus?.betSummary?.totalEarnings, user.build);
              return isNewWeek ? 0 : user.data?.weeklyStatus?.betSummary?.totalEarnings ?? 0;
            }], ['asc']);
          }
          setList(updateUser(newList, listFailedUpdate));
        },
        error: () => setError(true)
      });
  }, []);

  const statusCount = useMemo(() => {
    return {
      [UserStatusModel.IsDone]: userListFilterByStatus(list, UserStatusModel.IsDone).length,
      [UserStatusModel.InProgress]: userListFilterByStatus(list, UserStatusModel.InProgress).length,
      [UserStatusModel.IsWaiting]: userListFilterByStatus(list, UserStatusModel.IsWaiting).length
    };
  }, [list]);

  const restrictedCount = useMemo(() => {
    return list.filter((item) => {
      const { isNewWeek } = GetDatesUtil(item);
      return isNewWeek ? null : !!item.data.weeklyStatus?.hasBetRestriction || item.data.weeklyStatus?.accountAccessible === false;
    }).length;
  }, [list]);

  const hasFreeBet = useMemo(() => {
    return list.filter((item) => item.data.weeklyStatus?.freeBets.length).length !== 0
  }, [list])

  const hasMongoUpdate = useMemo(() => {
    return list.filter((item) => item.data.weeklyStatus?.mongoUpdateFailed).length !== 0
  }, [list])

  return {
    list,
    loading,
    error,
    handleOrderByStatus,
    statusCount,
    restrictedCount,
    hasFreeBet,
    hasMongoUpdate
  };
};

const userListFilterByStatus = (list: UserModel[], status: UserStatusModel) => {
  return list.filter((user) => {
    const userStatus = GetUserStatusUtil(user);
    return userStatus === status;
  });
};

export default useUseUserList;
