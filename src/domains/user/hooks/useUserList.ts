import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { tap } from 'rxjs';
import { ButtonProps } from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { orderBy, sum, sumBy } from 'lodash';
import { UserColumnSortModel, UserStatusModel } from '../../../api/rxjs-client/models/custom.models';
import { GetUserStatusUtil } from '../../../common/utils';
import { getMTDates, UserSupabaseModel, WithdrawalModel } from '@PlayAb/shared';
import { SharedApiSupabase } from '@PlayAb/services';
import { CheckboxProps } from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import { useLocation, useNavigate } from 'react-router-dom';

const useUserList = () => {
  const [rawList, setRawList] = useState<UserSupabaseModel[]>([]);
  const [list, setList] = useState<UserSupabaseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedUsers, setSelectedUsers] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    const usersFromUrl = location.pathname.replace('/users/', '').split(',').filter(Boolean);
    const newMap = new Map<string, boolean>();
    usersFromUrl.forEach((item) => newMap.set(item, true));

    setSelectedUsers(newMap);
  }, [location.pathname]);

  const dates = useMemo(() => getMTDates(), []);

  const getSort = useCallback(
    (list: UserSupabaseModel[], data: ButtonProps) => {
      const { weekStart } = dates;

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
              const weeklySummary = user?.data.weeklySummary?.find(
                (item) => item.data.weekStart === weekStart.toISOString()
              );
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
              const weeklySummary = user?.data.weeklySummary?.find(
                (item) => item.data.weekStart === weekStart.toISOString()
              );
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
              const weeklySummary = user?.data.weeklySummary?.find(
                (item) => item.data.weekStart === weekStart.toISOString()
              );
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
    },
    [dates]
  );

  useEffect(() => {
    setLoading(true);
    setError(false);

    const user$ = SharedApiSupabase.getUsersWithWeeklySummary()
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (res) => {
          const userList = res.data ?? [];
          setRawList(userList);
          const sorted = getSort(userList, { filter: UserColumnSortModel.Earnings });
          setList(sorted);
        },
        error: () => {
          setError(true);
          setLoading(false);
        },
      });

    return () => {
      user$.unsubscribe();
    };
  }, [getSort]);

  const handleOrderByStatus = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
      event.preventDefault();
      const newList = getSort(rawList, data);
      setList(newList);
    },
    [rawList, getSort]
  );

  const computedStats = useMemo(() => {
    const { weekStart, lastWeekStart } = dates;
    let doneCount = 0;
    let inProgressCount = 0;
    let waitingCount = 0;
    let restricted = 0;
    let hasAnyFreeBet = false;
    const allBonus: number[] = [];
    const allWithdrawals: Array<WithdrawalModel> = [];
    const allLastWeekWinnings: number[] = [];

    list.forEach((item) => {
      const userStatus = GetUserStatusUtil(item);
      if (userStatus === UserStatusModel.IsDone) doneCount++;
      if (userStatus === UserStatusModel.InProgress) inProgressCount++;
      if (userStatus === UserStatusModel.IsWaiting) waitingCount++;

      const weeklySummary = item.data.weeklySummary?.find(
        (betSum) => betSum.data.weekStart === weekStart.toISOString()
      );
      const lastWeekSummary = item.data.weeklySummary?.find(
        (betSum) => betSum.data.weekStart === lastWeekStart.toISOString()
      );

      if (weeklySummary) {
        if (weeklySummary.data.metadata?.hasBetRestriction) restricted++;
        if ((weeklySummary.data.freeBets?.length ?? 0) > 0) hasAnyFreeBet = true;

        const bonus = sumBy(weeklySummary.data.bonuses, 'Amount');
        allBonus.push(bonus);

        if (lastWeekSummary) {
          allLastWeekWinnings.push(bonus + lastWeekSummary.data.totalEarnings);
        }

        if (weeklySummary.data.withdrawals?.length) {
          weeklySummary.data.withdrawals.forEach((withdrawal) => {
            withdrawal.build = item.data.build;
            allWithdrawals.push(withdrawal);
          });
        }
      }
    });

    // Sort allWithdrawals by TransactionDateTime
    const sortedWithdrawals = orderBy(allWithdrawals, 'TransactionDateTime', 'desc');

    return {
      statusCount: {
        [UserStatusModel.IsDone]: doneCount,
        [UserStatusModel.InProgress]: inProgressCount,
        [UserStatusModel.IsWaiting]: waitingCount,
      },
      restrictedCount: restricted,
      hasFreeBet: hasAnyFreeBet,
      totals: {
        bonus: sum(allBonus),
        winnings: sum(allLastWeekWinnings),
        withdrawals: sortedWithdrawals,
      },
    };
  }, [list, dates]);

  const { statusCount, restrictedCount, hasFreeBet, totals } = computedStats;

  const handleRowClick = useCallback(
    (user: UserSupabaseModel) => () => {
      setSelectedUsers(new Map([[user._id, true]]));

      navigate(`./${user._id}`, {
        relative: 'route',
        replace: location.pathname.includes('@'),
      });
    },
    [location.pathname, navigate]
  );

  const handleCheckboxMultiUserChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      event.stopPropagation();

      setSelectedUsers((prev) => {
        const newMap = new Map(prev);
        if (data.checked) {
          newMap.set(data.value as string, true);
        } else {
          newMap.delete(data.value as string);
        }

        // *** MOVE NAVIGATION LOGIC HERE ***
        const joinUser: string[] = [];
        newMap.forEach((_, key) => {
          // Use the newMap here
          joinUser.push(key);
        });

        navigate(`./${joinUser.join(',')}`, {
          relative: 'route',
          replace: location.pathname.includes('@'),
        });
        return newMap;
      });
    },
    [location.pathname, navigate] // Remove 'selectedUsers' from dependencies
  );

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
    selectedUserMemo: selectedUsers, // Renamed for consistency, but keeping the return key as-is
    totals,
  };
};

export default useUserList;
