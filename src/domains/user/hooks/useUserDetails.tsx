import { useEffect, useState } from 'react';
import { forkJoin } from 'rxjs';
import { useLocation } from 'react-router-dom';
import { API, BetSummaryModel, BonusModel, EarningsModel, UserDetailModel, WithdrawalModel } from '@api/index';
import {
  endOfWeek,
  format,
  getISOWeeksInYear,
  isAfter,
  isBefore,
  isEqual,
  setISOWeek,
  startOfDay,
  startOfWeek,
  subDays,
} from 'date-fns';
import { groupBy, sumBy } from 'lodash';

const useUseUserDetails = () => {
  const { pathname } = useLocation();
  const [list, setList] = useState<{ title: string; data: EarningsModel[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailModel[]>([]);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  useEffect(() => {

    const emailArr = pathname.split('/').pop()?.split(',') ?? [];

    setLoading(true);
    console.log('gaga-------------------------------------emailArr', emailArr);
    const userDetails$ = forkJoin([
      API.getBetSummary({ email: { $in: emailArr } }),
      API.getBonuses({ email: { $in: emailArr } }),
      API.getWithdrawals({ email: { $in: emailArr } }),
      API.getUser({ email: { $in: emailArr } }),
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

        console.log('gaga-----------------------------weeksGroupedByMonKeys--------', weeksGroupedByMonKeys);


        setTotalWithdrawals(yearTotalWithdrawals);
        setTotalWinnings(yearTotalWinnings);
        setList(weeksGroupedByMonKeys);
        setUserDetails(userDetails);

      },
      error: () => setError(true),
    });
    return () => {
      userDetails$.unsubscribe();
    };
  }, [pathname]);

  return { list, loading, error, userDetails, totalWinnings, totalWithdrawals };
};

const getUserBonusList = (bonusList: BonusModel[]) => {
  return bonusList?.filter((item) => {
    return (
      item.TransactionStatus === 'Approved' &&
      item.TransactionType === 'Bonus' &&
      ['IMMEDIATE BONUS', 'Bonus'].includes(item.PaymentMethodInfo) &&
      item.Amount >= 10
    );
  }) ?? [];
};

const getUserWithdrawalList = (withdrawalList: WithdrawalModel[]) => {
  return withdrawalList?.filter((item) => {
    return ['Approved', 'Pending', 'Sending to Processor', 'In Process'].includes(item.TransactionStatus);
  }) ?? [];
};

const getWeeksForCurrentYear = (
  {
    betSummaryList,
    userBonusList,
    emailArr,
    userWithdrawalList,
  }: {
    betSummaryList: BetSummaryModel[];
    userBonusList: BonusModel[];
    emailArr: string[];
    userWithdrawalList: WithdrawalModel[];
  },
) => {
  const isoWeeksNumber = getISOWeeksInYear(Date.now());
  return Array.from({ length: isoWeeksNumber }, (_, i) => i + 1).map((weekNumber) => {

    const year = format(Date.now(), 'yyyy');
    const date = setISOWeek(Date.now(), weekNumber).toISOString();

    const startDate = startOfWeek(date, { weekStartsOn: 1 }).toISOString();
    const endDate = endOfWeek(startDate, { weekStartsOn: 0 }).toISOString();
    const mon = format(startDate, 'MMM');
    const monNumber = format(startDate, 'M');

    const weekStart = new Date(startDate);
    const weekEnd = new Date(endDate);
    weekStart.setUTCHours(0, 0, 0, 0);
    weekEnd.setUTCHours(23, 59, 59, 999);

    const betSummary = getBetSummaryByWeek(betSummaryList, weekStart, weekEnd, year);
    const { betSummaryByWeek, bonus, totalStaked, totalEarnings } = betSummary;
    let { approxWinnings } = betSummary;

    const bonusByWeek = getBonusByWeek(userBonusList, weekStart, weekEnd, emailArr);
    let playAbBonus = sumBy(bonusByWeek, (foundBonus) => foundBonus?.Amount ?? 0);
    if (bonusByWeek?.length !== emailArr?.length) {
      playAbBonus = bonus;
    } else {
      approxWinnings = 0;
    }
    let winnings = 0;
    if (bonusByWeek?.length && betSummaryByWeek?.length) {
      winnings = playAbBonus + sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.totalEarnings ?? 0);
    }

    const withdrawalByWeek = getWithdrawalByWeek(userWithdrawalList, weekStart, weekEnd);

    return {
      _id: `${mon}-${weekNumber}`,
      mon: monNumber + '-' + mon,
      year,
      startDate: weekStart.toISOString(),
      endDate: weekEnd.toISOString(),
      bonus: playAbBonus || bonus || 0,
      bonusDateTime: bonusByWeek?.[0]?.TransactionDateTime,
      totalStaked,
      totalEarnings,
      winnings,
      approxWinnings,
      loading: false,
      fetch: 0,
      title: mon,

      withdrawal: withdrawalByWeek,
    };


  });
};


const getBetSummaryByWeek = (betSummaryList: BetSummaryModel[], weekStart: Date, weekEnd: Date, year: string) => {
  const betSummaryByWeek = betSummaryList?.filter((item) => {
    return (
      item.startDate === weekStart.toISOString() &&
      item.endDate === weekEnd.toISOString() &&
      item.year === parseInt(year)
    );
  }) ?? [];



  const bonus = sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.bonus ?? 0);
  const totalStaked = sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.totalStaked ?? 0);
  const totalEarnings = sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.totalEarnings ?? 0);
  const approxWinnings = sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.winnings ?? 0);


  return {
    betSummaryByWeek,
    bonus, totalStaked, totalEarnings, approxWinnings,
  };
};

const getBonusByWeek = (userBonusList: BonusModel[], weekStart: Date, weekEnd: Date, emailArr: string[]) => {

  /*
   * get bonus
   * reverse to get the first occurrence not the latest
   * */
  return emailArr
    ?.map((email) => {
      return userBonusList?.reverse().find((item) => {
        const TransactionDateTime = startOfDay(subDays(item.TransactionDateTime, 7));
        return (
          isAfter(TransactionDateTime, weekStart) && isBefore(TransactionDateTime, weekEnd) && item.email === email
        );
      });
    })
    .filter(Boolean);

};

const getWithdrawalByWeek = (userWithdrawalList: WithdrawalModel[], weekStart: Date, weekEnd: Date) => {

  return userWithdrawalList?.find((item) => {
    const transactionDate = new Date(item.TransactionDateTime.split('T')[0]);
    transactionDate.setUTCHours(0, 0, 0, 0);
    const isSameOrAfter = isEqual(transactionDate, weekStart) || isAfter(transactionDate, weekStart);
    const isSameOrBefore = isEqual(transactionDate, weekEnd) || isBefore(transactionDate, weekEnd);
    return isSameOrAfter && isSameOrBefore;
  });

};

export default useUseUserDetails;
