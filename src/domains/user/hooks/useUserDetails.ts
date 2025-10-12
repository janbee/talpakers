import { useEffect, useState } from 'react';
import { forkJoin, map } from 'rxjs';
import { useLocation } from 'react-router-dom';
import { EarningsModel } from '../../../api/rxjs-client/models/custom.models';
import { groupBy, sumBy } from 'lodash';
import dayjs from 'dayjs';
import {
  BetSummarySupabaseModel,
  BonusSupabaseModel,
  UserSupabaseModel,
  WithdrawalSupabaseModel,
} from '@PlayAb/shared';
import GetWeeksOfYear from '../../../common/utils/get-weeks-of-year/GetWeeksOfYear';
import { SharedApiSupabase } from '@PlayAb/services';

const useUserDetails = () => {
  const { pathname } = useLocation();
  const [list, setList] = useState<{ title: string; data: EarningsModel[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userDetails, setUserDetails] = useState<UserSupabaseModel[]>([]);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const emailArr = pathname.split('/').pop()?.split(',') ?? [];

    setLoading(true);
    const userDetails$ = forkJoin([
      SharedApiSupabase.getBetsSummary(emailArr).pipe(map((res) => res.data || [])),
      SharedApiSupabase.getBonuses(emailArr).pipe(map((res) => res.data || [])),
      SharedApiSupabase.getWithdrawals(emailArr).pipe(map((res) => res.data || [])),
      SharedApiSupabase.getUsers(emailArr).pipe(map((res) => res.data || [])),
    ]).subscribe({
      next: ([betSummaryList, bonusList, withdrawalList, userDetails]) => {
        setLoading(false);

        const userBonusList = getUserBonusList(bonusList);
        const userWithdrawalList = getUserWithdrawalList(withdrawalList);
        const weeksForCurrentYear = getWeeksForCurrentYear({
          betSummaryList,
          userBonusList,
          emailArr,
          userWithdrawalList,
        });

        const weeksGroupedByMon = groupBy(weeksForCurrentYear, 'mon');
        const weeksGroupedByMonKeys = Object.keys(weeksGroupedByMon).map((key) => {
          return {
            title: key.split('-')[1],
            data: weeksGroupedByMon[key] as unknown as EarningsModel[],
          };
        });

        const yearTotalWinnings = sumBy(weeksGroupedByMonKeys, (item) => {
          return sumBy(item.data, 'winnings');
        });

        const yearTotalWithdrawals = sumBy(weeksGroupedByMonKeys, (item) => {
          return sumBy(item.data, 'withdrawal.Amount');
        });

        setTotalWithdrawals(yearTotalWithdrawals);
        setTotalWinnings(yearTotalWinnings);
        setList(weeksGroupedByMonKeys);
        setUserDetails(userDetails);
        setEmails(emailArr);
      },
      error: () => setError(true),
    });
    return () => {
      userDetails$.unsubscribe();
    };
  }, [pathname]);

  return {
    list,
    loading,
    error,
    userDetails,
    emails,
    totalWinnings,
    totalWithdrawals,
  };
};

const getUserBonusList = (bonusList: BonusSupabaseModel[]) => {
  return (
    bonusList?.filter((item) => {
      return (
        item.data.TransactionStatus === 'Approved' &&
        item.data.TransactionType === 'Bonus' &&
        ['IMMEDIATE BONUS', 'Bonus'].includes(item.data.PaymentMethodInfo) &&
        item.data.Amount >= 10
      );
    }) ?? []
  );
};

const getUserWithdrawalList = (withdrawalList: WithdrawalSupabaseModel[]) => {
  return (
    withdrawalList?.filter((item) => {
      return ['Approved', 'Pending', 'Sending to Processor', 'In Process'].includes(item.data.TransactionStatus);
    }) ?? []
  );
};

const getWeeksForCurrentYear = ({
  betSummaryList,
  userBonusList,
  emailArr,
  userWithdrawalList,
}: {
  betSummaryList: BetSummarySupabaseModel[];
  userBonusList: BonusSupabaseModel[];
  emailArr: string[];
  userWithdrawalList: WithdrawalSupabaseModel[];
}) => {
  const year = dayjs(Date.now()).year();

  const weeks = GetWeeksOfYear(year);

  return weeks.map(({ mondayDate, sundayDate, weekNumber }) => {
    const monday = dayjs(mondayDate);
    const mon = monday.format('MMM');
    const monNumber = monday.format('M');
    const year = monday.format('YYYY');

    const betSummary = getBetSummaryByWeek(betSummaryList, mondayDate, sundayDate, year);

    const { betSummaryByWeek, bonus, totalStaked, totalEarnings } = betSummary;
    let { approxWinnings } = betSummary;

    const bonusByWeek = getBonusByWeek(userBonusList, mondayDate, sundayDate, emailArr);
    let playAbBonus = sumBy(bonusByWeek, (foundBonus) => foundBonus?.data.Amount ?? 0);
    if (bonusByWeek?.length !== emailArr?.length) {
      playAbBonus = bonus;
    } else {
      approxWinnings = 0;
    }
    let winnings = 0;
    if (bonusByWeek?.length && betSummaryByWeek?.length) {
      winnings = playAbBonus + sumBy(betSummaryByWeek, (betSummary) => betSummary.data.totalEarnings ?? 0);
    }

    const withdrawalByWeek = getWithdrawalByWeek(userWithdrawalList, mondayDate, sundayDate);

    return {
      _id: `${mon}-${weekNumber}`,
      mon: monNumber + '-' + mon + ' ' + year,
      year,
      startDate: mondayDate.toISOString(),
      endDate: sundayDate.toISOString(),
      bonus: playAbBonus || bonus || 0,
      bonusDateTime: bonusByWeek?.[0]?.data.TransactionDateTime,
      totalStaked,
      totalEarnings,
      winnings,
      approxWinnings,
      loading: false,
      fetch: 0,
      title: `${mon}`,

      emails: emailArr,
      withdrawal: withdrawalByWeek,
    };
  });
};

const getBetSummaryByWeek = (
  betSummaryList: BetSummarySupabaseModel[],
  weekStart: Date,
  weekEnd: Date,
  year: number | string
) => {
  const betSummaryByWeek =
    betSummaryList?.filter((item) => {
      return (
        item.data.startDate === dayjs(weekStart).utc().startOf('day').toISOString() &&
        item.data.endDate === dayjs(weekEnd).utc().endOf('day').toISOString() &&
        item.data.year.toString() === year.toString()
      );
    }) ?? [];

  const bonus = sumBy(betSummaryByWeek, (betSummary) => betSummary.data.bonus ?? 0);
  const totalStaked = sumBy(betSummaryByWeek, (betSummary) => betSummary.data.totalStaked ?? 0);
  const totalEarnings = sumBy(betSummaryByWeek, (betSummary) => betSummary.data.totalEarnings ?? 0);
  const approxWinnings = sumBy(betSummaryByWeek, (betSummary) => betSummary.data.winnings ?? 0);

  return {
    betSummaryByWeek,
    bonus,
    totalStaked,
    totalEarnings,
    approxWinnings,
  };
};

const getBonusByWeek = (userBonusList: BonusSupabaseModel[], weekStart: Date, weekEnd: Date, emailArr: string[]) => {
  /*
   * get bonus
   * reverse to get the first occurrence not the latest
   * */
  return emailArr
    ?.map((email) => {
      return userBonusList?.reverse().find((item) => {
        const TransactionDateTime = dayjs(item.data.TransactionDateTime).startOf('day').subtract(7, 'days');
        return (
          TransactionDateTime.isAfter(weekStart) && TransactionDateTime.isBefore(weekEnd) && item.data.email === email
        );
      });
    })
    .filter(Boolean);
};

const getWithdrawalByWeek = (userWithdrawalList: WithdrawalSupabaseModel[], weekStart: Date, weekEnd: Date) => {
  return userWithdrawalList?.find((item) => {
    const transactionDate = new Date(item.data.TransactionDateTime.split('T')[0]);
    transactionDate.setUTCHours(0, 0, 0, 0);
    const TransactionDateTime = dayjs(transactionDate);
    return TransactionDateTime.isSameOrAfter(weekStart) && TransactionDateTime.isSameOrBefore(weekEnd);
  });
};

export default useUserDetails;
