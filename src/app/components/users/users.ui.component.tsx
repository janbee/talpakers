import { Button, Popup, Progress } from 'semantic-ui-react';
import classNames from 'classnames';
import { GetDates, GetUserStatus, Money, UserStatus } from '@utilities/utils';
import React, { useMemo } from 'react';
import { UserDetailModel } from '@models/custom.models';
import moment from 'moment/moment';
import { orderBy } from 'lodash';

export const BuildCol = ({ user }: { user: UserDetailModel }) => {
  const { weekStart } = GetDates();
  const isNewWeek = weekStart.toISOString() !== user.data?.weekStatus?.startDate;

  return (
    <>
      {!!user.data.weekStatus?.withdrawal && !isNewWeek && (
        <>
          {[
            {
              Pending: user.data.weekStatus?.withdrawal.TransactionStatus === 'Pending',
              Approved: user.data.weekStatus?.withdrawal.TransactionStatus === 'Approved',
              Processing: ['In Process', 'Sending to Processor'].includes(
                user.data.weekStatus?.withdrawal.TransactionStatus
              ),
            },
          ].map((status, index) => (
            <Popup
              key={index}
              position="right center"
              trigger={
                <div
                  className={classNames({
                    'has-withdrawal': true,
                    yellow: status.Pending,
                    green: status.Approved,
                    blue: status.Processing,
                  })}
                />
              }
              flowing
            >
              <Popup.Header>
                Withdrawal (
                <span
                  className={classNames({
                    'yellow-light': status.Pending,
                    'green-light': status.Approved,
                    'blue-light': status.Processing,
                  })}
                >
                  {user.data.weekStatus?.withdrawal?.TransactionStatus}
                </span>
                )
              </Popup.Header>
              <Popup.Content>
                {`${user.data.weekStatus?.withdrawal?.PaymentMethodInfo} ${Money(
                  user.data.weekStatus?.withdrawal?.Amount || 0
                )}`}
              </Popup.Content>
            </Popup>
          ))}
        </>
      )}
      <span>{user.build}</span>
    </>
  );
};

export const StatusCol = ({ loading, user }: { loading: boolean; user: UserDetailModel }) => {
  const userStatus = GetUserStatus(user);
  return (
    <>
      {!loading &&
        [userStatus].map((s, statusInd) => {
          let className = 'green-light';
          let FIcon = (
            <i
              key={statusInd}
              className="fa-solid fa-circle-check fa-beat"
              style={
                {
                  color: 'var(--green-dark)',
                  '--fa-animation-duration': '10s',
                } as any
              }
            />
          );
          if (s === UserStatus.InProgress) {
            className = 'yellow-light';
            FIcon = (
              <i
                key={statusInd}
                className="fa-solid fa-basketball fa-beat"
                style={
                  {
                    color: 'var(--yellow-dark)',
                    '--fa-animation-duration': '2s',
                  } as any
                }
              />
            );
          } else if (s === UserStatus.IsWaiting) {
            className = 'red-light';
            FIcon = (
              <i
                key={statusInd}
                className="fa-solid fa-circle-stop fa-beat"
                style={
                  {
                    color: 'var(--red-dark)',
                    '--fa-animation-duration': '5s',
                  } as any
                }
              />
            );
          }
          return (
            <Popup
              key={statusInd}
              position="top center"
              trigger={FIcon}
              content={() => <span className={className}>{s}</span>}
              mouseEnterDelay={1500}
              mouseLeaveDelay={500}
            />
          );
        })}
    </>
  );
};

export const WeekSummaryCol = ({ user }: { user: UserDetailModel }) => {
  const { weekStart } = GetDates();
  const isNewWeek = weekStart.toISOString() !== user.data?.weekStatus?.startDate;
  let totalEarnings = user.data?.weekStatus?.betSummary?.betSummary.totalEarnings || 0;
  let bonus = user.data?.weekStatus?.betSummary?.betSummary.bonus || 0;
  let winnings = user.data?.weekStatus?.betSummary?.betSummary.winnings || 0;

  if (isNewWeek) {
    totalEarnings = 0;
    bonus = 0;
    winnings = 0;
  }
  return (
    <>
      <div className={'week-summary-wrap'}>
        <span
          className={classNames({
            win: bonus > 0,
            lose: bonus < 0,
          })}
        >
          {Money(bonus)}
        </span>
        {' + '}
        <span
          className={classNames({
            win: totalEarnings > 0,
            lose: totalEarnings < 0,
          })}
        >
          {Money(totalEarnings)}
        </span>
        {' = '}
        <span
          className={classNames({
            win: winnings > 0,
            lose: winnings < 0,
          })}
        >
          {Money(winnings)}
        </span>
      </div>
    </>
  );
};

export const ProgressCol = ({ user }: { user: UserDetailModel }) => {
  const { weekStart } = GetDates();
  const isNewWeek = weekStart.toISOString() !== user.data?.weekStatus?.startDate;
  let totalStaked = user.data?.weekStatus?.betSummary?.betSummary.totalStaked || 0;
  if (isNewWeek) {
    totalStaked = 0;
  }
  return (
    <>
      <Progress
        indicating
        inverted
        success={user.data?.weekStatus?.done === true && totalStaked !== 0}
        precision={0}
        value={Math.floor(totalStaked)}
        progress={'percent'}
        total={380}
        label={Money(totalStaked)}
      />
    </>
  );
};

export const BetsCol = ({ user }: { user: UserDetailModel }) => {
  const bets = {
    open: user.data.weekStatus?.betSummary?.betSummary.openBets || 0,
    settled: user.data.weekStatus?.betSummary?.betSummary.settledBets || 0,
  };
  return (
    <>
      {[bets].map(({ open, settled }, betsIndex) => {
        return (
          <div key={betsIndex}>
            <span>{open}</span>
            <span>-</span>
            <span>{settled}</span>
          </div>
        );
      })}
    </>
  );
};

export const UserStatusCount = ({
  users,
  onClick,
}: {
  users?: UserDetailModel[];
  onClick: (e: React.SyntheticEvent<HTMLElement>, data: any) => void;
}) => {
  const filter = useMemo(() => {
    const { weekStart } = GetDates();
    return {
      isDone: (user: UserDetailModel) => {
        const isThisWeek = weekStart.toISOString() === user.data?.weekStatus?.startDate;
        return user.data?.weekStatus?.done === true && isThisWeek;
      },
      isInProgress: (user: UserDetailModel) => {
        const inProgress = user.data?.weekStatus?.done === false;
        const lastUpdate = moment(user.updatedAt || user.createdAt);
        const duration = moment.duration(lastUpdate.diff(Date.now()));
        const minutesPassed = Math.abs(duration.asMinutes());

        return inProgress && minutesPassed < 30;
      },
      isWaiting: (user: UserDetailModel) => {
        const lastUpdate = moment(user.updatedAt || user.createdAt);
        const duration = moment.duration(lastUpdate.diff(Date.now()));
        const minutesPassed = Math.abs(duration.asMinutes());
        return minutesPassed > 30;
      },

      orderByIsDone: (dataUsers: UserDetailModel[]) => {
        return orderBy(
          dataUsers,
          [
            (user) => {
              const userStatus = GetUserStatus(user);
              return userStatus === UserStatus.IsDone;
            },
            'updatedAt',
          ],
          ['desc', 'desc']
        );
      },
      orderByIsInProgress: (dataUsers: UserDetailModel[]) => {
        return orderBy(
          dataUsers,
          [
            (user) => {
              const userStatus = GetUserStatus(user);
              return userStatus === UserStatus.InProgress;
            },
            'data.weekStatus.betSummary.betSummary.totalStaked',
          ],
          ['desc', 'desc']
        );
      },
      orderByIsWaiting: (dataUsers: UserDetailModel[]) => {
        return orderBy(
          dataUsers,
          [
            (user) => {
              const userStatus = GetUserStatus(user);
              return userStatus === UserStatus.IsWaiting;
            },
            'data.weekStatus.betSummary.betSummary.totalStaked',
          ],
          ['desc', 'desc']
        );
      },
    };
  }, []);

  const getUserStatusCount = useMemo(() => {
    const status = {
      done: 0,
      inProgress: 0,
      waiting: 0,
    };
    users?.forEach((user) => {
      if (filter.isDone(user)) {
        status.done++;
      } else if (filter.isInProgress(user)) {
        status.inProgress++;
      } else if (filter.isWaiting(user)) {
        status.waiting++;
      }
    });
    return status;
  }, [users]);

  return (
    <div className={'filter-wrap'}>
      <Button
        compact
        style={{
          background: 'var(--green-dark)',
        }}
        size={'small'}
        onClick={onClick}
        data-value={{ orderBy: filter.orderByIsDone }}
      >
        Done {!!getUserStatusCount.done && `#${getUserStatusCount.done}`}
      </Button>
      <Button
        compact
        style={{
          background: 'var(--yellow-dark)',
        }}
        size={'small'}
        onClick={onClick}
        data-value={{ orderBy: filter.orderByIsInProgress }}
      >
        InProgress {!!getUserStatusCount.inProgress && `#${getUserStatusCount.inProgress}`}
      </Button>
      <Button
        compact
        style={{
          background: 'var(--red-dark)',
        }}
        size={'small'}
        onClick={onClick}
        data-value={{ orderBy: filter.orderByIsWaiting }}
      >
        Waiting {!!getUserStatusCount.waiting && `#${getUserStatusCount.waiting}`}
      </Button>
    </div>
  );
};
