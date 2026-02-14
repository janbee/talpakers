import { UserStatusModel } from '../../../../api/index';
import * as React from 'react';
import { FC } from 'react';
import { Popup, Progress, TableCell } from 'semantic-ui-react';
import classNames from 'classnames';
import { GetColorUtil, GetUserStatusUtil } from '../../../../common/utils';
import { StrictTableCellProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableCell';
import dayjs from 'dayjs';
import { convertToMT, getMTDates, toMoney, UserSupabaseModel } from '@PlayAb/shared';
import UserBetDetails from '../user-bet-details/UserBetDetails';
import { toPascalCase } from '@react-native-community/cli-platform-android/build/commands/runAndroid/toPascalCase';
import { sumBy } from 'lodash';
import { Link } from 'react-router-dom';
import UserPubnubComponent from './UserPubnub';

interface UserTableCellProps extends StrictTableCellProps {
  user: UserSupabaseModel;
  buildId?: string;
}

export const AppBuildCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { weekStart, weekEnd } = getMTDates();
  const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());
  const withdrawal = weeklySummary?.data.withdrawals?.[0];

  const gaga = ()=> {

    return <div>asdasdas</div>
  }

  return (
    <TableCell className={'md:!min-w-[33%] md:!text-center'}>
      {!!withdrawal && (
        <>
          {[
            {
              Pending: withdrawal.TransactionStatus === 'Pending',
              Approved: withdrawal.TransactionStatus === 'Approved',
              Processing: ['In Process', 'Sending to Processor'].includes(withdrawal.TransactionStatus),
            },
          ].map((status, index) => (
            <Popup
              key={index}
              position="right center"
              trigger={
                <div
                  className={classNames({
                    'has-withdrawal rounded-full h-2 w-2 top-2 right-2 absolute cursor-pointer': true,
                    'bg-yellow-dark': status.Pending,
                    'bg-green-dark': status.Approved,
                    'bg-blue-dark': status.Processing,
                  })}
                />
              }
              flowing
            >
              <Popup.Header>
                <div className={'withdrawal-header'}>
                  <span>
                    Withdrawal (
                    <span
                      className={classNames({
                        'text-yellow-light': status.Pending,
                        'text-green-light': status.Approved,
                        'text-blue-light': status.Processing,
                      })}
                    >
                      {withdrawal?.TransactionStatus}
                    </span>
                    )
                  </span>
                  <span className={`transaction-wrap`}>
                    {` ${withdrawal?.TransactionDateTime && dayjs(withdrawal.TransactionDateTime).fromNow()}`}
                  </span>
                </div>
              </Popup.Header>
              <Popup.Content>
                <div>{`${withdrawal?.PaymentMethodInfo} ${toMoney(withdrawal?.Amount ?? 0)}`}</div>
              </Popup.Content>
            </Popup>
          ))}
        </>
      )}

      <Popup
        position="right center"
        on={'click'}
        trigger={<span onClick={(event) => event.stopPropagation()} className={`text-white hover:text-white`}>{user.data.build}</span>}
        flowing
      >
        <Popup.Content>
          <UserPubnubComponent/>
        </Popup.Content>
      </Popup>
    </TableCell>
  );
};

export const StatusCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const userStatus = GetUserStatusUtil(user);

  return (
    <TableCell className={'md:!min-w-[33%] md:!text-right'} textAlign={'center'}>
      {[userStatus].map((s, statusInd) => {
        let className = 'text-green-light cursor-pointer';
        let FIcon = <i key={statusInd} className="fa-solid fa-circle-check  text-green-dark cursor-pointer" />;
        if (s === UserStatusModel.InProgress) {
          className = 'text-yellow-light cursor-pointer';
          FIcon = <i key={statusInd} className="fa-solid fa-basketball  text-yellow-dark cursor-pointer" />;
        } else if (s === UserStatusModel.IsWaiting) {
          className = 'text-red-light cursor-pointer';
          FIcon = <i key={statusInd} className="fa-solid fa-circle-stop  text-red-dark cursor-pointer" />;
        }
        return (
          <Popup key={statusInd} position="top center" trigger={FIcon} mouseEnterDelay={1500} mouseLeaveDelay={500}>
            <span className={className}>{s}</span>
          </Popup>
        );
      })}
    </TableCell>
  );
};

export const VersionCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  return (
    <TableCell className={'md:hidden'} user={user} collapsing>
      <Popup
        position="right center"
        trigger={<span>{user.data.version}</span>}
        flowing
        disabled={!user.data.codePushVersion}
      >
        <Popup.Content>
          <span className={'text-green-light'}>{user.data.codePushVersion}</span>
        </Popup.Content>
      </Popup>
    </TableCell>
  );
};

export const WeeklySummaryCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { weekStart } = getMTDates();

  const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());

  const totalEarnings = weeklySummary?.data.totalEarnings || 0;
  const winnings = weeklySummary?.data.winnings || 0;
  const bonus = weeklySummary?.data.potentialBonus || 0;

  return (
    <TableCell className={'md:flex-1'} textAlign={'center'}>
      <div className={'week-summary-wrap flex justify-evenly'}>
        <span
          className={classNames({
            'block w-[50px]': true,
            'text-green-dark': bonus > 0,
          })}
        >
          {toMoney(bonus)}
        </span>
        {' + '}
        <span
          className={classNames({
            'block w-[50px]': true,
            'text-green-dark': totalEarnings > 0,
            'text-red-dark': totalEarnings < 0,
          })}
        >
          {toMoney(totalEarnings)}
        </span>
        {' = '}
        <span
          className={classNames({
            'block w-[50px]': true,
            'text-green-dark': winnings > 0,
            'text-red-dark': winnings < 0,
          })}
        >
          {toMoney(winnings)}
        </span>
      </div>
    </TableCell>
  );
};

export const WeeklyProgressCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { weekStart } = getMTDates();
  const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());
  const totalStaked = weeklySummary?.data.totalStaked || 0;

  return (
    <TableCell className={'md:w-full'} textAlign={'center'}>
      <Progress
        inverted
        success={weeklySummary?.data.done === true && totalStaked !== 0}
        precision={0}
        value={Math.floor(totalStaked)}
        progress={'percent'}
        total={500}
        label={toMoney(totalStaked)}
      />
    </TableCell>
  );
};

export const BetsCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { weekStart } = getMTDates();
  const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());
  const bets = {
    open: weeklySummary?.data.openBets ?? 0,
    settled: weeklySummary?.data.settledBets ?? 0,
  };

  return (
    <TableCell className={'md:w-[60px]'}>
      {[bets].map(({ open, settled }, betsIndex) => {
        return (
          <div key={betsIndex}>
            <Popup
              className={'w-[500px] max-h-96 !p-0 h-96'}
              position="bottom center"
              on={'click'}
              trigger={
                <div className={'cursor-pointer flex justify-between'} onClick={(event) => event.stopPropagation()}>
                  <span>{open}</span>
                  <span>-</span>
                  <span>{settled}</span>
                </div>
              }
              flowing
            >
              <UserBetDetails user={user} />
            </Popup>
          </div>
        );
      })}
    </TableCell>
  );
};

export const NextWithdrawalCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const maintainCash = user.data.userSession?.autoCashout?.maintainCash ?? 100;
  const fixedAmount = (user.data.userSession?.autoCashout?.fixedAmount ?? 900) + maintainCash;
  const cashout = user.data.userSession?.cashout ?? 0;
  const cash = user.data.userSession?.cash ?? 0;
  const cashoutPercent = Math.floor((cashout / fixedAmount) * 100);

  const nextCashOutPercent = (cashout / fixedAmount) * -100 + 100;
  const bgColor = GetColorUtil(nextCashOutPercent, 100);
  return (
    <TableCell className={'md:hidden'}>
      <div className={'flex justify-between'}>
        <Popup
          position="left center"
          trigger={<span style={{ color: bgColor }}>{toMoney(cashout.toFixed(0), 0)}</span>}
          flowing
        >
          <Popup.Header>
            <span className={'text-green-light'}>Current Cash - {toMoney(cash, 0)}</span>
          </Popup.Header>
          <Popup.Header>
            <span className={'text-green-light'}>Cashout at - {`${cashoutPercent}%`}</span>
          </Popup.Header>
        </Popup>
        <span>/</span>
        <span>{toMoney(fixedAmount, 0)}</span>
      </div>
    </TableCell>
  );
};

export const BetRestrictedCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { weekStart } = getMTDates();

  const weeklySummary = user.data.weeklySummary?.find((item) => {
    return item.data.weekStart === weekStart.toISOString();
  });

  const hasBetRestriction = weeklySummary?.data.metadata?.['hasMinimumBetRestriction'];
  return (
    <TableCell className={'md:hidden relative'} textAlign={'center'}>
      {hasBetRestriction && (
        <Popup position="left center" trigger={<span className={'text-red-dark'}>true</span>} flowing>
          <Popup.Header>
            <span className={'text-red-light'}>{dayjs(hasBetRestriction).fromNow()}</span>
          </Popup.Header>
        </Popup>
      )}
    </TableCell>
  );
};

/*export const MongoFailedUpdate: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const { isWithinThisWeek } = getMTDates();
  const isNewWeek = !isWithinThisWeek(user?.data?.weeklyStatus?.startDate);
  const hasFailedUpdates = isNewWeek ? null : user.data.weeklyStatus?.mongoUpdateFailed === true;

  return (
    <TableCell className={'relative'} {...omit(props, ['user'])}>
      {hasFailedUpdates && <span className={'text-red-dark'}>true</span>}
    </TableCell>
  );
};*/

export const BonusCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { weekStart, weekEnd } = getMTDates();
  const weeklySummary = user.data.weeklySummary?.find((item) => {
    return item.data.weekStart === weekStart.toISOString();
  });
  const bonus = weeklySummary?.data.bonuses?.[0];

  const curl = `curl 'https://webapi.playalberta.ca/api/v1/Player/GetPlayerTransactionsAndShoppingCartsHistory?UniqueDeviceId=5632ff40-be41-49fe-a567-6e14bee92e86' \\
  -H 'accept: application/json, text/plain, */*' \\
  -H 'accept-language: en-US,en;q=0.9' \\
  -H 'content-type: application/json;charset=UTF-8' \\
  --data-raw '${JSON.stringify({
    BrandID: '128',
    LanguageCode: 'ENG',
    PlatformType: 'W',
    CountryCode: 'CA',
    AFI: '128',
    MMI: '0',
    PlayerID: user.data.userSession?.EXTERNAL_PLAYER_ID,
    SessionToken: user.data.userSession?.ISID,
    TransactionType: 'BON',
    DateFrom: weekStart.toISOString(),
    DateTo: weekEnd.toISOString(),
    PageSize: 1,
    PageIndex: 1,
  })}'`;

  return (
    <TableCell onClick={(event: any) => event.stopPropagation()} textAlign={'center'} className={'relative md:hidden'}>
      <Popup
        position="top center"
        disabled={!bonus?.Amount}
        trigger={
          <span
            onClick={() => navigator.clipboard.writeText(curl)}
            className={classNames({
              'cursor-pointer': true,
              'text-green-dark': !!bonus?.Balance,
            })}
          >
            {toMoney(bonus?.Amount || 0, 0)}
          </span>
        }
        flowing
      >
        <Popup.Header className={'text-green-light'}>
          <span>Total Balance :{toMoney(bonus?.Balance || 0)}</span>
          <span> - </span>
          <span>{dayjs(bonus?.TransactionDateTime).fromNow()}</span>
        </Popup.Header>
      </Popup>
    </TableCell>
  );
};

export const LastWeekWinningsCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { lastWeekStart, weekStart } = getMTDates();
  const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());
  const lastWeekSummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === lastWeekStart.toISOString());

  const weeklyBonus = sumBy(weeklySummary?.data.bonuses, (bonus) => {
    return bonus.Amount;
  });
  const totalEarnings = lastWeekSummary?.data.totalEarnings || 0;

  const lastWeekWinnings = totalEarnings + weeklyBonus;

  return (
    <TableCell onClick={(event: any) => event.stopPropagation()} className={'relative md:hidden'} textAlign={'center'}>
      <span
        className={classNames({
          'text-green-dark': lastWeekWinnings > 0,
          'text-red-dark': lastWeekWinnings < 0,
        })}
      >
        {toMoney(lastWeekWinnings, 0)}
      </span>
    </TableCell>
  );
};

export const LottoTicketsCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  return (
    <TableCell className={'relative md:hidden'} textAlign={'center'}>
      <span
        className={classNames({
          'text-green-dark': user.data.lottoTickets?.length,
        })}
      >
        {user.data.lottoTickets?.length} / {toMoney(user.data.totalPurchases || 0, 0)}
      </span>
    </TableCell>
  );
};

export const TotalDepositsCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  return (
    <TableCell className={'relative md:hidden'} textAlign={'center'}>
      <span>{toMoney(user.data.totalDeposits || 0, 0)}</span>
    </TableCell>
  );
};

export const LifetimeLossCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const lifeTimeLoss = user.data.userSession?.GPD?.lifetimeWinAndLoss || '0.00';
  return (
    <TableCell className={'relative md:hidden'} textAlign={'center'}>
      <span className={'text-red-dark'}>{toMoney(lifeTimeLoss)}</span>
    </TableCell>
  );
};

export const FreeBetCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { weekStart } = getMTDates();
  const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());

  const freeBets = weeklySummary?.data?.freeBets || [];

  return (
    <TableCell className={'relative md:hidden'} textAlign={'center'}>
      <Popup
        position="top center"
        trigger={<span>{!!freeBets.length && <span className={'text-green-dark'}>{freeBets.length}</span>}</span>}
        flowing
      >
        {freeBets.map((t) => (
          <Popup.Header key={t.PlayerBonusID} className={'text-green-light'}>
            <span>{toMoney(t.BonusAmount)}</span>
            <span> - </span>
            <span>{dayjs(t.FreeGameUsageExpirationDateTime).fromNow()}</span>
          </Popup.Header>
        ))}
      </Popup>
    </TableCell>
  );
};

export const AutoLoginCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  return (
    <TableCell
      className={classNames({
        'md:hidden': true,
        'text-green-dark': !!user.data?.settings?.electronAutoLogin,
        'text-red-dark': !user.data?.settings?.electronAutoLogin,
      })}
      collapsing
      textAlign={'center'}
    >
      {`${!!user.data?.settings?.electronAutoLogin}`}
    </TableCell>
  );
};

export const LastLoginCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const lastUpdate = new Date(user.data.userSession?.GPD?.lastLogin || user.updatedAt || new Date());
  const lastUpdate$ = dayjs(lastUpdate).tz('America/Denver');
  const hoursPassed = dayjs.duration(-lastUpdate$.diff(Date.now())).asHours();
  const bgColor = GetColorUtil(hoursPassed, 72);

  return (
    <TableCell className={'relative'} textAlign={'center'}>
      <span style={{ color: bgColor }}>{getMTDates().fromNow(convertToMT(lastUpdate))} </span>
    </TableCell>
  );
};

export const ActiveCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { weekStart } = getMTDates();
  const weeklySummary = user?.data.weeklySummary?.find((item) => item.data.weekStart === weekStart.toISOString());

  const date = user.updatedAt || user.createdAt || new Date();
  const lastUpdate = new Date(date);
  const metadata = weeklySummary?.data.metadata;
  const lastUpdate$ = dayjs(lastUpdate).tz('America/Denver');
  const minutesPassed = dayjs.duration(-lastUpdate$.diff(Date.now())).asMinutes();

  const bgColor = GetColorUtil(minutesPassed, 30);

  const notifications = [];
  const twoFactorAuthValue = user.data?.userSession?.TWO_FACTOR_AUTH;

  if (typeof twoFactorAuthValue !== 'string' || !user.data.userSession?.TWO_FACTOR_AUTH) {
    notifications.push('Missing TWO_FACTOR_AUTH');
  }

  Object.keys(metadata || {}).forEach((key) => {
    if (metadata?.[key]) {
      notifications.push(`${toPascalCase(key)} ${dayjs(metadata[key]).tz('America/Denver').fromNow()}`);
    }
  });

  return (
    <TableCell className={'relative md:flex-1 md:!text-right'} textAlign={'center'}>
      <Popup
        position="left center"
        trigger={
          <div
            className={classNames({
              'rounded-full h-2 w-2 top-2 right-2 absolute cursor-pointer': notifications.length,
              'bg-red-light': true,
            })}
          />
        }
        flowing
      >
        {notifications.map((t) => (
          <Popup.Header key={t}>
            <span
              className={classNames({
                'text-red-light': true,
              })}
            >
              {t}
            </span>
          </Popup.Header>
        ))}
      </Popup>
      <span style={{ color: bgColor }}>{getMTDates().fromNow(convertToMT(lastUpdate))} </span>
    </TableCell>
  );
};
