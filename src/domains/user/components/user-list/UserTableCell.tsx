import { UserDetailModel, UserStatusModel } from '@api/index';
import { FC } from 'react';
import { Popup, Progress, TableCell } from 'semantic-ui-react';
import classNames from 'classnames';
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';
import { GetColorUtil, GetDatesUtil, GetUserStatusUtil, MoneyUtil } from '@common/utils';
import { StrictTableCellProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableCell';
import { omit } from 'lodash';

interface UserTableCellProps extends StrictTableCellProps {
  user: UserDetailModel;
}


export const AppBuildCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { isNewWeek } = GetDatesUtil(user);


  return (
    <TableCell {...omit(props, ['user'])} className={'relative'}>
      {!!user.data.weekStatus?.withdrawal && !isNewWeek && (
        <>
          {[
            {
              Pending: user.data.weekStatus?.withdrawal.TransactionStatus === 'Pending',
              Approved: user.data.weekStatus?.withdrawal.TransactionStatus === 'Approved',
              Processing: ['In Process', 'Sending to Processor'].includes(
                user.data.weekStatus?.withdrawal.TransactionStatus,
              ),
            },
          ].map((status, index) => (
            <Popup
              key={index}
              position='right center'
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
                      {user.data.weekStatus?.withdrawal?.TransactionStatus}
                    </span>
                    )
                  </span>
                  <span className={`transaction-wrap`}>
                    {` ${user.data.weekStatus?.withdrawal?.TransactionDateTime && formatDistanceToNow(user.data.weekStatus.withdrawal.TransactionDateTime, { addSuffix: true })}`}
                  </span>
                </div>
              </Popup.Header>
              <Popup.Content>
                <div>
                  {`${user.data.weekStatus?.withdrawal?.PaymentMethodInfo} ${MoneyUtil(
                    user.data.weekStatus?.withdrawal?.Amount ?? 0,
                  )}`}
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
      {
        [userStatus].map((s, statusInd) => {
          let className = 'text-green-light cursor-pointer';
          let FIcon = (
            <i
              key={statusInd}
              className='fa-solid fa-circle-check fa-beat text-green-dark cursor-pointer'
              style={
                {
                  '--fa-animation-duration': '10s',
                } as never
              }
            />
          );
          if (s === UserStatusModel.InProgress) {
            className = 'text-yellow-light cursor-pointer';
            FIcon = (
              <i
                key={statusInd}
                className='fa-solid fa-basketball fa-beat text-yellow-dark cursor-pointer'
                style={
                  {
                    '--fa-animation-duration': '2s',
                  } as never
                }
              />
            );
          } else if (s === UserStatusModel.IsWaiting) {
            className = 'text-red-light cursor-pointer';
            FIcon = (
              <i
                key={statusInd}
                className='fa-solid fa-circle-stop fa-beat text-red-dark cursor-pointer'
                style={
                  {
                    '--fa-animation-duration': '5s',
                  } as never
                }
              />
            );
          }
          return (
            <Popup
              key={statusInd}
              position='top center'
              trigger={FIcon}
              mouseEnterDelay={1500}
              mouseLeaveDelay={500}
            >
              <span className={className}>{s}</span>
            </Popup>
          );
        })}
    </TableCell>
  );
};

export const WeeklySummaryCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { isNewWeek } = GetDatesUtil(user);

  let totalEarnings = user.data?.weekStatus?.betSummary?.betSummary.totalEarnings ?? 0;
  let bonus = user.data?.weekStatus?.betSummary?.betSummary.bonus ?? 0;
  let winnings = user.data?.weekStatus?.betSummary?.betSummary.winnings ?? 0;

  if (isNewWeek) {
    totalEarnings = 0;
    bonus = 0;
    winnings = 0;
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
  const { isNewWeek } = GetDatesUtil(user);

  let totalStaked = user.data?.weekStatus?.betSummary?.betSummary.totalStaked ?? 0;
  if (isNewWeek) {
    totalStaked = 0;
  }
  return (
    <TableCell {...omit(props, ['user'])}>
      <Progress
        indicating
        inverted
        success={user.data?.weekStatus?.done === true && totalStaked !== 0}
        precision={0}
        value={Math.floor(totalStaked)}
        progress={'percent'}
        total={380}
        label={MoneyUtil(totalStaked)}
      />
    </TableCell>
  );
};

export const BetsCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { isNewWeek } = GetDatesUtil(user);
  const bets = {
    open: user.data.weekStatus?.betSummary?.betSummary.openBets ?? 0,
    settled: user.data.weekStatus?.betSummary?.betSummary.settledBets ?? 0,
  };
  const lastBet = user.data.weekStatus?.lastBet ?? 0;
  if (isNewWeek) {
    bets.open = 0;
    bets.settled = 0;
  }
  return (
    <TableCell {...omit(props, ['user'])}>
      {[bets].map(({ open, settled }, betsIndex) => {
        return (
          <div
            key={betsIndex}
            className={'flex justify-between'}>
            <Popup
              position='left center'
              trigger={<span>{open}</span>}
              flowing>
              <Popup.Header>
                <span className={'text-green-light'}>Last Bet - {MoneyUtil(lastBet)}</span>
              </Popup.Header>
            </Popup>
            <span>-</span>
            <span>{settled}</span>
          </div>
        );
      })}
    </TableCell>
  );
};

export const NextWithdrawalCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const fixedAmount = (user.data.userSession?.autoCashout?.fixedAmount ?? 900) + 80;
  const cashout = user.data.userSession?.cashout ?? 0;
  return (
    <TableCell {...omit(props, ['user'])}>
      <div className={'flex justify-between'}>
        <span>{MoneyUtil(cashout.toFixed(0), { minimumFractionDigits: 0 })}</span>
        <span>/</span>
        <span>{MoneyUtil(fixedAmount, { minimumFractionDigits: 0 })}</span>
      </div>
    </TableCell>
  );
};

export const ActiveCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;

  const { isNewWeek } = GetDatesUtil(user);


  const lastUpdate = user.updatedAt ?? user.createdAt ?? new Date();
  const minutesPassed = -(differenceInMinutes(lastUpdate, Date.now()));


  const bgColor = minutesPassed > 30 ? GetColorUtil(29) : GetColorUtil(Math.floor(minutesPassed));
  let hasBetRestriction = isNewWeek ? null : user.data.weekStatus?.hasBetRestriction === true;

  let txt = 'Bet Restricted (T_T) !!!';

  if (!user.data.userSession?.TWO_FACTOR_AUTH) {
    hasBetRestriction = true;
    txt = 'Missing TWO_FACTOR_AUTH';
  }


  return (
    <TableCell {...omit(props, ['user'])}>
      <Popup
        position="left center"
        trigger={
          <div
            className={classNames({
              'bg-red-dark': true,
              'has-dot': hasBetRestriction,
            })}
          />
        }
        flowing
      >
        <Popup.Header>
          <span
            className={classNames({
              'red-light': true,
            })}
          >
            {txt}
          </span>
        </Popup.Header>
      </Popup>
      <span style={{ color: bgColor }}>{formatDistanceToNow(lastUpdate, { addSuffix: true })}</span>
    </TableCell>
  );
};
