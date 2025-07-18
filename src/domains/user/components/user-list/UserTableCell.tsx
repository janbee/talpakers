import { UserStatusModel } from '../../../../api/index';
import * as React from 'react';
import { FC } from 'react';
import { Popup, Progress, TableCell } from 'semantic-ui-react';
import classNames from 'classnames';
import { GetColorUtil, GetUserStatusUtil, MoneyUtil } from '../../../../common/utils';
import { StrictTableCellProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableCell';
import { omit } from 'lodash';
import dayjs from 'dayjs';
import { convertToMT, getMTDates, isDateWithin, toMoney, UserModel } from '@PlayAb/shared';
import UserBetDetails from '../user-bet-details/UserBetDetails';
import { toPascalCase } from '@react-native-community/cli-platform-android/build/commands/runAndroid/toPascalCase';

interface UserTableCellProps extends StrictTableCellProps {
  user: UserModel;
}

export const AppBuildCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const TransactionDateTime = user.data.weeklyStatus?.withdrawal?.TransactionDateTime;
  const { weekStart, weekEnd } = getMTDates();
  const isThisWeek = isDateWithin(TransactionDateTime, {
    starDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
  });

  const curl = `curl 'https://webapi.playalberta.ca/api/v1/Player/GetPlayerTransactionsAndShoppingCartsHistory?UniqueDeviceId=5632ff40-be41-49fe-a567-6e14bee92e86' \\
  -H 'accept: application/json, text/plain, */*' \\
  -H 'accept-language: en-US,en;q=0.9' \\
  -H 'content-type: application/json;charset=UTF-8' \\
  --data-raw '${JSON.stringify({
    BrandID: '128',
    LanguageCode: 'ENG',
    CountryCode: 'CA',
    AFI: '128',
    MMI: '0',
    PlayerID: user.data.userSession?.EXTERNAL_PLAYER_ID,
    SessionToken: user.data.userSession?.ISID,
    TransactionType: 'COR',
    DateFrom: weekStart.toISOString(),
    DateTo: weekEnd.toISOString(),
    PageSize: 1,
    PageIndex: 1,
  })}'`;

  return (
    <TableCell {...omit(props, ['user'])}>
      {!!user.data.weeklyStatus?.withdrawal && isThisWeek && (
        <>
          {[
            {
              Pending: user.data.weeklyStatus?.withdrawal.TransactionStatus === 'Pending',
              Approved: user.data.weeklyStatus?.withdrawal.TransactionStatus === 'Approved',
              Processing: ['In Process', 'Sending to Processor'].includes(
                user.data.weeklyStatus?.withdrawal.TransactionStatus
              ),
            },
          ].map((status, index) => (
            <Popup
              key={index}
              position="right center"
              trigger={
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                    navigator.clipboard.writeText(curl);
                  }}
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
                      {user.data.weeklyStatus?.withdrawal?.TransactionStatus}
                    </span>
                    )
                  </span>
                  <span className={`transaction-wrap`}>
                    {` ${user.data.weeklyStatus?.withdrawal?.TransactionDateTime && dayjs(user.data.weeklyStatus.withdrawal.TransactionDateTime).fromNow()}`}
                  </span>
                </div>
              </Popup.Header>
              <Popup.Content>
                <div>
                  {`${user.data.weeklyStatus?.withdrawal?.PaymentMethodInfo} ${MoneyUtil(user.data.weeklyStatus?.withdrawal?.Amount ?? 0)}`}
                </div>
              </Popup.Content>
            </Popup>
          ))}
        </>
      )}
      <span>{user.build}</span>
    </TableCell>
  );
};

export const StatusCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const userStatus = GetUserStatusUtil(user);
  return (
    <TableCell {...omit(props, ['user'])}>
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
    <TableCell {...omit(props, ['user'])}>
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
  const { isWithinThisWeek } = getMTDates();
  const isNewWeek = !isWithinThisWeek(user?.data?.weeklyStatus?.startDate);

  let totalEarnings = user.data.weeklyStatus?.betSummary?.totalEarnings || 0;
  let winnings = user.data.weeklyStatus?.betSummary?.winnings || 0;
  let bonus = user.data.weeklyStatus?.betSummary?.bonus || 0;

  if (isNewWeek) {
    totalEarnings = 0;
    winnings = 0;
    bonus = 0;
  }

  return (
    <TableCell {...omit(props, ['user'])}>
      <div className={'week-summary-wrap flex justify-evenly'}>
        <span
          className={classNames({
            'block w-[50px]': true,
            'text-green-dark': bonus > 0,
          })}
        >
          {MoneyUtil(bonus)}
        </span>
        {' + '}
        <span
          className={classNames({
            'block w-[50px]': true,
            'text-green-dark': totalEarnings > 0,
            'text-red-dark': totalEarnings < 0,
          })}
        >
          {MoneyUtil(totalEarnings)}
        </span>
        {' = '}
        <span
          className={classNames({
            'block w-[50px]': true,
            'text-green-dark': winnings > 0,
            'text-red-dark': winnings < 0,
          })}
        >
          {MoneyUtil(winnings)}
        </span>
      </div>
    </TableCell>
  );
};

export const WeeklyProgressCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { isWithinThisWeek } = getMTDates();
  const isNewWeek = !isWithinThisWeek(user?.data?.weeklyStatus?.startDate);

  const highestTotalStaked = user.data?.weeklyStatus?.highestTotalStaked || 0;
  const totalStaked = user.data.weeklyStatus?.betSummary?.totalStaked || 0;

  let finalTotalStaked = Math.max(highestTotalStaked, totalStaked);

  if (isNewWeek) {
    finalTotalStaked = 0;
  }
  return (
    <TableCell {...omit(props, ['user'])}>
      <Progress
        inverted
        success={user.data?.weeklyStatus?.done === true && finalTotalStaked !== 0}
        precision={0}
        value={Math.floor(finalTotalStaked)}
        progress={'percent'}
        total={500}
        label={MoneyUtil(finalTotalStaked)}
      />
    </TableCell>
  );
};

export const BetsCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { isWithinThisWeek } = getMTDates();
  const isNewWeek = !isWithinThisWeek(user?.data?.weeklyStatus?.startDate);
  const bets = {
    open: user.data.weeklyStatus?.betSummary?.openBets ?? 0,
    settled: user.data.weeklyStatus?.betSummary?.settledBets ?? 0,
  };

  if (isNewWeek) {
    bets.open = 0;
    bets.settled = 0;
  }

  return (
    <TableCell {...omit(props, ['user'])}>
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

  const nextCashOutPercent = (cashout / fixedAmount) * -30 + 30;
  const bgColor = nextCashOutPercent > 30 ? GetColorUtil(29) : GetColorUtil(Math.floor(nextCashOutPercent));

  return (
    <TableCell {...omit(props, ['user'])}>
      <div className={'flex justify-between'}>
        <Popup
          position="left center"
          trigger={
            <span style={{ color: bgColor }}>{MoneyUtil(cashout.toFixed(0), { minimumFractionDigits: 0 })}</span>
          }
          flowing
        >
          <Popup.Header>
            <span className={'text-green-light'}>Current Cash - {MoneyUtil(cash, { minimumFractionDigits: 0 })}</span>
          </Popup.Header>
          <Popup.Header>
            <span className={'text-green-light'}>Cashout at - {`${cashoutPercent}%`}</span>
          </Popup.Header>
        </Popup>
        <span>/</span>
        <span>{MoneyUtil(fixedAmount, { minimumFractionDigits: 0 })}</span>
      </div>
    </TableCell>
  );
};

export const BetRestrictedCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const { isWithinThisWeek } = getMTDates();
  const isNewWeek = !isWithinThisWeek(user?.data?.weeklyStatus?.startDate);

  const hasBetRestriction = isNewWeek
    ? null
    : !!user.data.weeklyStatus?.hasBetRestriction || user.data.weeklyStatus?.accountAccessible === false;

  return (
    <TableCell className={'relative'} {...omit(props, ['user'])}>
      {hasBetRestriction && (
        <Popup position="left center" trigger={<span className={'text-red-dark'}>true</span>} flowing>
          <Popup.Header>
            <span className={'text-red-light'}>{dayjs(user.data.weeklyStatus?.hasBetRestriction).fromNow()}</span>
          </Popup.Header>
        </Popup>
      )}
    </TableCell>
  );
};

export const MongoFailedUpdate: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const { isWithinThisWeek } = getMTDates();
  const isNewWeek = !isWithinThisWeek(user?.data?.weeklyStatus?.startDate);
  const hasFailedUpdates = isNewWeek ? null : user.data.weeklyStatus?.mongoUpdateFailed === true;

  return (
    <TableCell className={'relative'} {...omit(props, ['user'])}>
      {hasFailedUpdates && <span className={'text-red-dark'}>true</span>}
    </TableCell>
  );
};

export const BonusCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { isWithinThisWeek, weekStart, weekEnd } = getMTDates();
  const isNewWeek = !isWithinThisWeek(user?.data?.weeklyStatus?.startDate);

  let bonus = user.data.weeklyStatus?.bonus;

  if (isNewWeek) {
    bonus = undefined;
  }

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
    <TableCell onClick={(event) => event.stopPropagation()} className={'relative'} {...omit(props, ['user'])}>
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

export const LottoTicketsCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  return (
    <TableCell className={'relative'} {...omit(props, ['user'])}>
      <span>{user.data.lottoTickets?.length}</span>
    </TableCell>
  );
};

export const LifetimeLossCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const lifeTimeLoss = user.data.userSession?.GPD?.lifetimeWinAndLoss || '0.00';
  return (
    <TableCell className={'relative'} {...omit(props, ['user'])}>
      <span className={'text-red-dark'}>{MoneyUtil(lifeTimeLoss)}</span>
    </TableCell>
  );
};

export const FreeBetCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const freeBets = user.data.weeklyStatus?.freeBets || [];

  return (
    <TableCell className={'relative'} {...omit(props, ['user'])}>
      <Popup
        position="top center"
        trigger={<span>{!!freeBets.length && <span className={'text-green-dark'}>{freeBets.length}</span>}</span>}
        flowing
      >
        {freeBets.map((t) => (
          <Popup.Header key={t.PlayerBonusID} className={'text-green-light'}>
            <span>{MoneyUtil(t.BonusAmount)}</span>
            <span> - </span>
            <span>{dayjs(t.FreeGameUsageExpirationDateTime).fromNow()}</span>
          </Popup.Header>
        ))}
      </Popup>
    </TableCell>
  );
};

export const LastLoginCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const lastUpdate = new Date(user.data.userSession?.GPD?.lastLogin || new Date());
  const lastUpdate$ = dayjs(lastUpdate).tz('America/Denver');
  const minutesPassed = dayjs.duration(-lastUpdate$.diff(Date.now())).asMinutes();

  const bgColor = minutesPassed > 30 ? GetColorUtil(29) : GetColorUtil(Math.floor(minutesPassed));

  return (
    <TableCell className={'relative'} {...omit(props, ['user'])}>
      <span style={{ color: bgColor }}>{getMTDates().fromNow(lastUpdate)} </span>
    </TableCell>
  );
};

export const ActiveCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { isWithinThisWeek } = getMTDates();
  const isNewWeek = !isWithinThisWeek(user?.data?.weeklyStatus?.startDate);

  const lastUpdate = user.updatedAt ?? user.createdAt ?? new Date();
  const metadata = isNewWeek ? {} : user.data.weeklyStatus?.metadata;
  const lastUpdate$ = dayjs(lastUpdate).tz('America/Denver');
  const minutesPassed = dayjs.duration(-lastUpdate$.diff(Date.now())).asMinutes();

  const bgColor = minutesPassed > 30 ? GetColorUtil(29) : GetColorUtil(Math.floor(minutesPassed));

  const notifications = [];

  if (!user.data.userSession?.TWO_FACTOR_AUTH) {
    notifications.push('Missing TWO_FACTOR_AUTH');
  }

  Object.keys(metadata || {}).forEach((key) => {
    if (metadata?.[key]) {
      notifications.push(`${toPascalCase(key)} ${dayjs(metadata[key]).tz('America/Denver').fromNow()}`);
    }
  });

  return (
    <TableCell className={'relative'} {...omit(props, ['user'])}>
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
