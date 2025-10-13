import * as React from 'react';
import { FC } from 'react';
import classNames from 'classnames';
import { EarningsModel } from '../../../../api/rxjs-client/models/custom.models';
import dayjs from 'dayjs';
import { Header, Icon, Label, Menu, Popup } from 'semantic-ui-react';
import { toMoney, UserModel, UserSupabaseModel } from '@PlayAb/shared';

export const WeeklyCard: FC<{ earnings: EarningsModel }> = ({ earnings }) => {
  const startDate = dayjs(earnings.startDate).utc();
  const endDate = dayjs(earnings.endDate).utc();

  return (
    <div
      className={
        'week-item flex flex-col w-[150px] aspect-square bg-neutral-900 rounded-lg mr-4 mt-4 p-3 dark:text-white'
      }
    >
      <div className={'week-content flex h-full flex-col'}>
        <div className={'week-date flex-1'}>
          <span>
            {startDate.format('ddd D')} - {endDate.format('ddd D')}
          </span>
        </div>
        <div className={'flex flex-1 justify-between'}>
          <span>Staked</span>
          <span>{toMoney(earnings.totalStaked)}</span>
        </div>
        <div className={'flex flex-1 justify-between'}>
          <span>Earnings</span>
          <span>{toMoney(earnings.totalEarnings)}</span>
        </div>
        <div className={'flex flex-1 justify-between'}>
          <span>Bonus</span>
          <span>{toMoney(earnings.bonus)}</span>
        </div>
        {(earnings.approxWinnings > 0 && <ApproxWinnings earnings={earnings} />) || <Winnings earnings={earnings} />}
      </div>
    </div>
  );
};

export const ApproxWinnings: FC<{ earnings: EarningsModel }> = ({ earnings }) => {
  return (
    <div className={'flex flex-1 justify-between'}>
      <span>Winnings</span>
      <Popup
        content="Approximate Earnings."
        position="top center"
        trigger={
          <span
            className={classNames({
              'text-yellow-dark': true,
              'cursor-pointer': true,
            })}
          >
            {toMoney(earnings.approxWinnings)}
          </span>
        }
      />
    </div>
  );
};

export const Winnings: FC<{ earnings: EarningsModel }> = ({ earnings }) => {
  return (
    <div className={'flex flex-1 justify-between'}>
      <span>Winnings</span>
      <Popup
        disabled={!earnings.bonusDateTime}
        content={dayjs(earnings.bonusDateTime).format('ddd hh:mm A')}
        position="top center"
        trigger={
          <span
            className={classNames({
              'cursor-pointer': true,
              'text-green-dark': earnings.winnings > 0,
              'text-red-dark': earnings.winnings < 0,
            })}
          >
            {toMoney(earnings.winnings)}
          </span>
        }
      />
    </div>
  );
};

export const WithdrawalPopup: FC<{ earnings: EarningsModel }> = ({ earnings }) => {
  const multipleUserView = earnings.emails.length >= 2;

  if (!earnings.withdrawal || multipleUserView) {
    return null;
  }

  const withdrawalStatus = [
    {
      Pending: earnings.withdrawal.TransactionStatus === 'Pending',
      Approved: earnings.withdrawal.TransactionStatus === 'Approved',
      Processing: ['In Process', 'Sending to Processor'].includes(earnings.withdrawal.TransactionStatus),
    },
  ];

  return (
    <>
      {withdrawalStatus.map((status, index) => {
        return (
          <Popup
            key={`WithdrawalPopup-${index}`}
            on="click"
            position="left center"
            trigger={
              <div
                className={classNames({
                  'rounded-full h-2 w-2 top-6 right-6 absolute cursor-pointer': true,
                  'bg-yellow-dark': status.Pending,
                  'bg-green-dark': status.Approved,
                  'bg-blue-dark': status.Processing,
                })}
              />
            }
            flowing
          >
            <Popup.Header>
              Withdrawal (
              <span
                className={classNames({
                  'text-yellow-light': status.Pending,
                  'text-green-light': status.Approved,
                  'text-blue-light': status.Processing,
                })}
              >
                {earnings.withdrawal?.TransactionStatus}
              </span>
              )
              <span className={`transaction-wrap`}>
                {` ${earnings.withdrawal?.TransactionDateTime && dayjs(earnings.withdrawal.TransactionDateTime).fromNow()}`}
              </span>
            </Popup.Header>
            <Popup.Content>
              {`${earnings.withdrawal?.PaymentMethodInfo} ${toMoney(earnings.withdrawal?.Amount ?? 0)}`}
            </Popup.Content>
          </Popup>
        );
      })}
    </>
  );
};

export const UserYearlySummary: FC<{
  userDetails: UserSupabaseModel[];
  totalWinnings: number;
  totalWithdrawals: number;
}> = ({ userDetails, totalWinnings, totalWithdrawals }) => {
  return (
    <Popup
      on="hover"
      basic
      trigger={<Icon name="info circle" size={'small'} className={'cursor-pointer dark:text-white'} />}
      position="bottom right"
      mouseLeaveDelay={60000}
    >
      <Menu vertical>
        <Menu.Item header>
          <Header as="h3">Year {dayjs().format('YYYY')} Details</Header>
        </Menu.Item>
        <Menu.Item>
          <Header as="h4">Current Balance</Header>
          <Label className={'!float-none !ml-0'} color="green">
            {toMoney(userDetails?.[0]?.data?.userSession?.cash ?? 0)}
          </Label>
        </Menu.Item>
        <Menu.Item>
          <Header as="h4">Available Cashout</Header>
          <Label className={'!float-none !ml-0'} color="orange">
            {toMoney(userDetails?.[0]?.data?.userSession?.cashout ?? 0)}
          </Label>
        </Menu.Item>
        <Menu.Item>
          <Header as="h4">Total Earnings this year</Header>
          <Label className={'!float-none !ml-0'} color="purple">
            {toMoney(totalWinnings)}
          </Label>
        </Menu.Item>
        <Menu.Item>
          <Header as="h4">Total Cashout this year</Header>
          <Label className={'!float-none !ml-0'} color="red">
            {' '}
            {toMoney(Math.abs(totalWithdrawals ?? 0))}
          </Label>
        </Menu.Item>
      </Menu>
    </Popup>
  );
};
