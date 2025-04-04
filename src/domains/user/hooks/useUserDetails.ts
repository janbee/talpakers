import { useEffect, useState } from 'react';
import { forkJoin } from 'rxjs';
import { useLocation } from 'react-router-dom';
import { EarningsModel } from '../../../api/rxjs-client/models/custom.models';
import { groupBy, sumBy } from 'lodash';
import dayjs from 'dayjs';
import { BetSummaryModel, BonusModel, SharedApi, UserModel, WithdrawalModel } from '@PlayAb/shared';
import GetWeeksOfYear from '../../../common/utils/get-weeks-of-year/GetWeeksOfYear';

const useUserDetails = () => {
  const { pathname } = useLocation();
  const [list, setList] = useState<{ title: string; data: EarningsModel[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userDetails, setUserDetails] = useState<UserModel[]>([]);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const emailArr = pathname.split('/').pop()?.split(',') ?? [];

    setLoading(true);
    const userDetails$ = forkJoin([SharedApi.getBetSummary({ email: { $in: emailArr } }), SharedApi.getBonuses({ email: { $in: emailArr } }), SharedApi.getWithdrawals({ email: { $in: emailArr } }), SharedApi.getUsers({ email: { $in: emailArr } })]).subscribe({
      next: ([betSummaryList, bonusList, withdrawalList, userDetails]) => {


        console.log('gaga----betSummaryList---------------------------------', betSummaryList);
        setLoading(false);

        const userBonusList = getUserBonusList(bonusList);
        const userWithdrawalList = getUserWithdrawalList(withdrawalList);
        const weeksForCurrentYear = getWeeksForCurrentYear({
          betSummaryList,
          userBonusList,
          emailArr,
          userWithdrawalList
        });

        const weeksGroupedByMon = groupBy(weeksForCurrentYear, 'mon');
        const weeksGroupedByMonKeys = Object.keys(weeksGroupedByMon).map((key) => {
          return {
            title: key.split('-')[1],
            data: weeksGroupedByMon[key] as unknown as EarningsModel[]
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
      error: () => setError(true)
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
    totalWithdrawals
  };
};

const getUserBonusList = (bonusList: BonusModel[]) => {
  return (bonusList?.filter((item) => {
    return (item.TransactionStatus === 'Approved' && item.TransactionType === 'Bonus' && ['IMMEDIATE BONUS', 'Bonus'].includes(item.PaymentMethodInfo) && item.Amount >= 10);
  }) ?? []);
};

const getUserWithdrawalList = (withdrawalList: WithdrawalModel[]) => {
  return (withdrawalList?.filter((item) => {
    return ['Approved', 'Pending', 'Sending to Processor', 'In Process'].includes(item.TransactionStatus);
  }) ?? []);
};

const getWeeksForCurrentYear = ({
  betSummaryList,
  userBonusList,
  emailArr,
  userWithdrawalList
}: {
  betSummaryList: BetSummaryModel[];
  userBonusList: BonusModel[];
  emailArr: string[];
  userWithdrawalList: WithdrawalModel[];
}) => {
  const year = dayjs(Date.now()).year();

  const weeks = GetWeeksOfYear(year);


  console.log('gaga-------------------1--------------weeks----', weeks, year);

  return weeks.map(({
    mondayDate,
    sundayDate,
    weekNumber
  }) => {

    const monday = dayjs(mondayDate);
    const mon = monday.format('MMM');
    const monNumber = monday.format('M');
    const year = monday.format('YYYY');

    const betSummary = getBetSummaryByWeek(betSummaryList, mondayDate, sundayDate, year);

    const {
      betSummaryByWeek,
      bonus,
      totalStaked,
      totalEarnings
    } = betSummary;
    let { approxWinnings } = betSummary;

    const bonusByWeek = getBonusByWeek(userBonusList, mondayDate, sundayDate, emailArr);
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

    const withdrawalByWeek = getWithdrawalByWeek(userWithdrawalList, mondayDate, sundayDate);

    return {
      _id: `${mon}-${weekNumber}`,
      mon: monNumber + '-' + mon + ' ' + year,
      year,
      startDate: mondayDate.toISOString(),
      endDate: sundayDate.toISOString(),
      bonus: playAbBonus || bonus || 0,
      bonusDateTime: bonusByWeek?.[0]?.TransactionDateTime,
      totalStaked,
      totalEarnings,
      winnings,
      approxWinnings,
      loading: false,
      fetch: 0,
      title: `${mon}`,

      emails: emailArr,
      withdrawal: withdrawalByWeek
    };
  });
};

const getBetSummaryByWeek = (betSummaryList: BetSummaryModel[], weekStart: Date, weekEnd: Date, year: number | string) => {
  const betSummaryByWeek = betSummaryList?.filter((item) => {
    return (item.startDate === dayjs(weekStart).utc().startOf('day').toISOString() && item.endDate === dayjs(weekEnd).utc().endOf('day').toISOString() && item.year.toString() === year.toString());
  }) ?? [];

  const bonus = sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.bonus ?? 0);
  const totalStaked = sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.totalStaked ?? 0);
  const totalEarnings = sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.totalEarnings ?? 0);
  const approxWinnings = sumBy(betSummaryByWeek, (betSummary) => betSummary?.betSummary.winnings ?? 0);

  return {
    betSummaryByWeek,
    bonus,
    totalStaked,
    totalEarnings,
    approxWinnings
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
        const TransactionDateTime = dayjs(item.TransactionDateTime).startOf('day').subtract(7, 'days');
        return TransactionDateTime.isAfter(weekStart) && TransactionDateTime.isBefore(weekEnd) && item.email === email;
      });
    })
    .filter(Boolean);
};

const getWithdrawalByWeek = (userWithdrawalList: WithdrawalModel[], weekStart: Date, weekEnd: Date) => {
  return userWithdrawalList?.find((item) => {
    const transactionDate = new Date(item.TransactionDateTime.split('T')[0]);
    transactionDate.setUTCHours(0, 0, 0, 0);
    const TransactionDateTime = dayjs(transactionDate);
    return TransactionDateTime.isSameOrAfter(weekStart) && TransactionDateTime.isSameOrBefore(weekEnd);
  });
};

export default useUserDetails;
