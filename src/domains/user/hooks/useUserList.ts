import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { tap } from 'rxjs';
import { ButtonProps } from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { orderBy, sum, sumBy } from 'lodash';
import { UserColumnSortModel, UserStatusModel } from '../../../api/rxjs-client/models/custom.models';
import { GetUserStatusUtil } from '../../../common/utils';
import { getMTDates, UserSupabaseModel } from '@PlayAb/shared';
import { SharedApiSupabase } from '@PlayAb/services';
import { CheckboxProps } from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import { useLocation, useNavigate } from 'react-router-dom';

const useUseUserList = () => {
  const [list, setList] = useState<UserSupabaseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setError(false);

    const user$ = SharedApiSupabase.getUsersWithWeeklySummary()
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (res) => {
          const userList = res.data ?? [];
          const newList = getSort(userList, { filter: UserColumnSortModel.Earnings });
          setList(newList);
        },
        error: () => setError(true),
      });

    return () => {
      user$.unsubscribe();
    };
  }, []);

  const getSort = (list: UserSupabaseModel[], data: ButtonProps) => {
    const { weekStart } = getMTDates();

    if (data.filter === UserStatusModel.IsDone) {
      return orderBy(
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
      return orderBy(
        list,
        [
          (user) => {
            const userStatus = GetUserStatusUtil(user);
            return userStatus === UserStatusModel.InProgress;
          },
          (user) => {
            const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());
            return weeklySummary?.data.totalStaked ?? 0;
          },
        ],
        ['desc', 'desc']
      );
    } else if (data.filter === UserStatusModel.IsWaiting) {
      return orderBy(
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
    } else if (data.filter === UserColumnSortModel.NextWithdrawal) {
      return orderBy(
        list,
        [
          (user) => {
            const maintainCash = user.data.userSession?.autoCashout?.maintainCash ?? 100;
            const fixedAmount = (user.data.userSession?.autoCashout?.fixedAmount ?? 900) + maintainCash;
            const cashout = user.data.userSession?.cashout ?? 0;
            return Math.floor((cashout / fixedAmount) * 100);
          },
        ],
        ['desc']
      );
    } else if (data.filter === UserColumnSortModel.Earnings) {
      return orderBy(
        list,
        [
          (user) => {
            const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());
            return weeklySummary?.data.totalEarnings ?? 0;
          },
        ],
        ['asc']
      );
    } else if (data.filter === UserColumnSortModel.OpenBets) {
      return orderBy(
        list,
        [
          (user) => {
            const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());
            return weeklySummary?.data.openBets ?? 0;
          },
        ],
        ['desc']
      );
    } else if (data.filter === UserColumnSortModel.Active) {
      return orderBy(
        list,
        [
          (user) => {
            return user.updatedAt;
          },
        ],
        ['desc']
      );
    }

    return list;
  };

  const handleOrderByStatus = useCallback((event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
    event.preventDefault();

    setLoading(true);
    setError(false);

    SharedApiSupabase.getUsersWithWeeklySummary()
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (res) => {
          const userList = res.data ?? [];
          const newList = getSort(userList, data);
          setList(newList);
        },
        error: () => setError(true),
      });
  }, []);

  const statusCount = useMemo(() => {
    return {
      [UserStatusModel.IsDone]: userListFilterByStatus(list, UserStatusModel.IsDone).length,
      [UserStatusModel.InProgress]: userListFilterByStatus(list, UserStatusModel.InProgress).length,
      [UserStatusModel.IsWaiting]: userListFilterByStatus(list, UserStatusModel.IsWaiting).length,
    };
  }, [list]);

  const restrictedCount = useMemo(() => {
    const { weekStart } = getMTDates();

    return list.filter((item) => {
      const weeklySummary = item?.data.weeklySummary?.find((item) => {
        return item.data.weekStart === weekStart.toISOString();
      });

      return !!weeklySummary?.data.metadata?.hasBetRestriction;
    }).length;
  }, [list]);

  const hasFreeBet = useMemo(() => {
    const { weekStart } = getMTDates();

    return (
      list.filter((item) => {
        const weeklySummary = item?.data.weeklySummary?.find((item) => {
          return item.data.weekStart === weekStart.toISOString();
        });

        return weeklySummary?.data.freeBets?.length ?? 0;
      }).length !== 0
    );
  }, [list]);

  const selectedUserMemo = useMemo<Map<string, boolean>>(() => {
    const usersFromUrl = location.pathname.replace('/users/', '').split(',').filter(Boolean);
    const users = new Map<string, boolean>();

    usersFromUrl.forEach((item) => {
      users.set(item, true);
    });

    return users;
  }, [location.pathname]);

  const handleRowClick = useCallback(
    (user: UserSupabaseModel) => () => {
      selectedUserMemo.clear();
      selectedUserMemo.set(user._id, true);

      navigate(`./${user._id}`, {
        relative: 'route',
        replace: location.pathname.includes('@'),
      });
    },
    [location.pathname, navigate, selectedUserMemo]
  );

  const handleCheckboxMultiUserChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      event.stopPropagation();

      if (data.checked) {
        selectedUserMemo.set(data.value as string, true);
      } else {
        selectedUserMemo.delete(data.value as string);
      }

      const joinUser: string[] = [];
      selectedUserMemo.forEach((_, key) => {
        joinUser.push(key);
      });

      navigate(`./${joinUser.join(',')}`, {
        relative: 'route',
        replace: location.pathname.includes('@'),
      });
    },
    [location.pathname, navigate, selectedUserMemo]
  );

  const totals = useMemo(() => {
    const { weekStart, lastWeekStart } = getMTDates();
    const allBonus: number[] = [];
    const allLastWeekWinnings: number[] = [];
    list.forEach((item) => {
      const foundWeeklySummary = item.data.weeklySummary?.find(
        (betSum) => betSum.data.weekStart === weekStart.toISOString()
      );

      const foundLastWeekSummary = item.data.weeklySummary?.find(
        (betSum) => betSum.data.weekStart === lastWeekStart.toISOString()
      );

      if (foundWeeklySummary) {
        const bonus = sumBy(foundWeeklySummary.data.bonuses, (bonus) => {
          return bonus.Amount;
        });
        allBonus.push(bonus);

        if (foundLastWeekSummary) {
          allLastWeekWinnings.push(bonus + foundLastWeekSummary.data.totalEarnings);
        }
      }
    });

    return {
      bonus: sum(allBonus),
      winnings: sum(allLastWeekWinnings),
    };
  }, [list]);

  return {
    list,
    loading,
    error,
    handleOrderByStatus,
    statusCount,
    restrictedCount,
    hasFreeBet,
    handleCheckboxMultiUserChange,
    handleRowClick,
    selectedUserMemo,
    totals,
  };
};

const userListFilterByStatus = (list: UserSupabaseModel[], status: UserStatusModel) => {
  return list.filter((user) => {
    const userStatus = GetUserStatusUtil(user);
    return userStatus === status;
  });
};

export default useUseUserList;
