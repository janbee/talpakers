import { UserDetailModel, UserStatusModel } from '@api/index';
import { FC } from 'react';
import { Popup, TableCell } from 'semantic-ui-react';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import { GetDatesUtil, MoneyUtil } from '@common/utils';
import GetUserStatusUtil from '@common/utils/get-user-status-util/GetUserStatusUtil.ts';
import { StrictTableCellProps } from 'semantic-ui-react/dist/commonjs/collections/Table/TableCell';
import { omit } from 'lodash';

interface UserTableCellProps extends StrictTableCellProps {
  user: UserDetailModel;
}


export const AppBuildCell: FC<UserTableCellProps> = (props) => {
  const { user } = props;
  const { isNewWeek } = GetDatesUtil(user);


  return (
    <TableCell {...omit(props, ['user'])}>
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
                <div className={'withdrawal-header'}>
                  <span>
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
                  </span>
                  <span className={`transaction-wrap`}>
                    {`${user.data.weekStatus?.withdrawal?.TransactionDateTime && formatDistanceToNow(user.data.weekStatus.withdrawal.TransactionDateTime, { addSuffix: true })}`}
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
          let className = 'green-light';
          let FIcon = (
            <i
              key={statusInd}
              className='fa-solid fa-circle-check fa-beat'
              style={
                {
                  color: 'var(--green-dark)',
                  '--fa-animation-duration': '10s',
                } as never
              }
            />
          );
          if (s === UserStatusModel.InProgress) {
            className = 'yellow-light';
            FIcon = (
              <i
                key={statusInd}
                className='fa-solid fa-basketball fa-beat'
                style={
                  {
                    color: 'var(--yellow-dark)',
                    '--fa-animation-duration': '2s',
                  } as never
                }
              />
            );
          } else if (s === UserStatusModel.IsWaiting) {
            className = 'red-light';
            FIcon = (
              <i
                key={statusInd}
                className='fa-solid fa-circle-stop fa-beat'
                style={
                  {
                    color: 'var(--red-dark)',
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
              content={() => <span className={className}>{s}</span>}
              mouseEnterDelay={1500}
              mouseLeaveDelay={500}
            />
          );
        })}
    </TableCell>
  );
};
