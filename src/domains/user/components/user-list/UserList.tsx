import * as React from 'react';
import { CSSProperties, FC, useCallback, useMemo } from 'react';
import {
  Button,
  Checkbox,
  Dimmer,
  Form,
  FormField,
  Icon,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';

import { useLocation, useNavigate } from 'react-router-dom';
import { CheckboxProps } from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import classNames from 'classnames';
import {
  ActiveCell,
  AppBuildCell,
  BetRestrictedCell,
  BetsCell,
  BonusCell,
  FreeBetCell,
  LifetimeLossCell,
  LottoTicketsCell,
  MongoFailedUpdate,
  NextWithdrawalCell,
  StatusCell,
  VersionCell,
  WeeklyProgressCell,
  WeeklySummaryCell,
} from './UserTableCell';
import useUserList from '../../hooks/useUserList';
import { UserColumnSortModel, UserStatusModel } from '../../../../api/rxjs-client/models/custom.models';
import { UserModel } from '@PlayAb/shared';

const UserListComponent: FC = () => {
  const {
    list,
    loading,
    handleOrderByStatus,
    statusCount,
    restrictedCount,
    hasFreeBet,
    hasMongoUpdate,
    hasEmailUpdate,
  } = useUserList();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedUserMemo = useMemo<Map<string, boolean>>(() => {
    const usersFromUrl = location.pathname.replace('/users/', '').split(',').filter(Boolean);
    const users = new Map<string, boolean>();

    usersFromUrl.forEach((item) => {
      users.set(item, true);
    });

    return users;
  }, [location.pathname]);

  const handleRowClick = useCallback(
    (user: UserModel) => () => {
      selectedUserMemo.clear();
      selectedUserMemo.set(user._id, true);

      navigate(`./${user._id}`, {
        relative: 'route',
        replace: location.pathname.includes('@'),
      });
    },
    [location.pathname, navigate, selectedUserMemo]
  );

  const handleCheckboxMultiUserChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      event.stopPropagation();

      if (data.checked) {
        selectedUserMemo.set(data.value as string, true);
      } else {
        selectedUserMemo.delete(data.value as string);
      }

      const joinUser: string[] = [];
      selectedUserMemo.forEach((_, key) => {
        joinUser.push(key);
      });

      navigate(`./${joinUser.join(',')}`, {
        relative: 'route',
        replace: location.pathname.includes('@'),
      });
    },
    [location.pathname, navigate, selectedUserMemo]
  );

  return (
    <div
      data-testid="UserList"
      className={'w-full m-4 bg-neutral-800 rounded-lg relative [&:has(+[data-testid="UserDetails"])]:mr-0'}
    >
      <div className={'flex flex-col p-4 h-full'}>
        <div className={'flex flex-row items-start justify-between h-12'}>
          <span className={'dark:text-white text-2xl'}>Users {selectedUserMemo.size > 1 && selectedUserMemo.size}</span>
          <Icon
            circular
            inverted
            className={'cursor-pointer !text-xl !mt-[-3px]'}
            onClick={handleOrderByStatus}
            name="refresh"
          />
        </div>
        <hr />
        <Form className={'flex-1 overflow-auto mt-4'}>
          <Table size={'small'} selectable compact striped celled inverted unstackable>
            <TableHeader
              className={classNames({
                'bg-neutral-900 sticky top-0 z-10': true,
                'md:!hidden': true,
              })}
            >
              <TableRow>
                <TableHeaderCell collapsing>#</TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'}>
                  App Build
                </TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'}>
                  Status
                </TableHeaderCell>
                <TableHeaderCell collapsing>Version</TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[205px] relative'}>
                  Weekly Summary <br />
                  (Bonus + Earnings = Total)
                  <Button
                    className={'absolute !text-[9px] top-0 right-0 bottom-0 left-0 opacity-0'}
                    inverted
                    onClick={handleOrderByStatus}
                    filter={UserColumnSortModel.Earnings}
                  />
                </TableHeaderCell>
                <TableHeaderCell textAlign={'center'} className={'min-w-[74px]'}>
                  Weekly <br />
                  Progress
                </TableHeaderCell>
                <TableHeaderCell collapsing className={'min-w-[60px] relative'}>
                  Bets
                  <Button
                    className={'absolute !text-[9px] top-0 right-0 bottom-0 left-0 opacity-0'}
                    inverted
                    onClick={handleOrderByStatus}
                    filter={UserColumnSortModel.OpenBets}
                  />
                </TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[105px] relative'}>
                  Next <br />
                  Withdrawal
                  <Button
                    className={'absolute !text-[9px] top-0 right-0 bottom-0 left-0 opacity-0'}
                    inverted
                    onClick={handleOrderByStatus}
                    filter={UserColumnSortModel.NextWithdrawal}
                  />
                </TableHeaderCell>

                {!!restrictedCount && (
                  <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[75px]'}>
                    Bet <br />
                    Restricted
                  </TableHeaderCell>
                )}

                {hasMongoUpdate && (
                  <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[75px]'}>
                    Mongo <br />
                    Update
                  </TableHeaderCell>
                )}

                {hasEmailUpdate && (
                  <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[75px]'}>
                    Email <br />
                    Update
                  </TableHeaderCell>
                )}

                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[75px]'}>
                  Bonus
                </TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[60px]'}>
                  Tickets
                </TableHeaderCell>

                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[75px]'}>
                  Total <br />
                  Loss
                </TableHeaderCell>

                {hasFreeBet && (
                  <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[75px]'}>
                    Free <br />
                    Bet
                  </TableHeaderCell>
                )}

                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[95px]'}>
                  Active <br />
                  Predictions
                </TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[50px]'}>
                  Auto <br />
                  Login
                </TableHeaderCell>
                {/*<TableHeaderCell collapsing textAlign={'center'} className={'min-w-[105px]'}>
                Last
                Login
              </TableHeaderCell>*/}
                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[105px] relative'}>
                  Active
                  <Button
                    className={'absolute !text-[9px] top-0 right-0 bottom-0 left-0 opacity-0'}
                    inverted
                    onClick={handleOrderByStatus}
                    filter={UserColumnSortModel.Active}
                  />
                </TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {list.map((user) => {
                return (
                  <TableRow
                    className={classNames({
                      'md:flex md:flex-row md:flex-wrap': true,
                      'child:md:!border-0 child:relative': true,
                    })}
                    key={user._id}
                    onClick={handleRowClick(user)}
                  >
                    <TableCell className={'md:!min-w-[33%]'}>
                      <FormField>
                        <Checkbox
                          checked={selectedUserMemo.has(user._id)}
                          type={'checkbox'}
                          name={'user'}
                          value={user._id}
                          style={{ '--cb-size': '15px' } as CSSProperties}
                          className={'max-w-[25px] h-[5px] mt-1'}
                          onChange={handleCheckboxMultiUserChange}
                          toggle
                        />
                      </FormField>
                    </TableCell>
                    <AppBuildCell className={'md:!min-w-[33%] md:!text-center'} user={user} />
                    <StatusCell className={'md:!min-w-[33%] md:!text-right'} textAlign={'center'} user={user} />

                    <VersionCell className={'md:hidden'} user={user} collapsing />

                    <WeeklySummaryCell className={'md:flex-1'} textAlign={'center'} user={user} />

                    <WeeklyProgressCell className={'md:w-full'} textAlign={'center'} user={user} />

                    <BetsCell className={'md:w-[60px]'} user={user} />
                    <NextWithdrawalCell className={'md:hidden'} user={user} />

                    {!!restrictedCount && (
                      <BetRestrictedCell className={'md:hidden'} textAlign={'center'} user={user} />
                    )}

                    {hasMongoUpdate && <MongoFailedUpdate className={'md:hidden'} textAlign={'center'} user={user} />}

                    {hasEmailUpdate && (
                      <TableCell
                        className={classNames({
                          'md:hidden': true,
                          'text-green-dark': !user.data.weeklyStatus?.emailUpdate,
                          'text-red-dark': !!user.data.weeklyStatus?.emailUpdate,
                        })}
                        collapsing
                        textAlign={'center'}
                      >
                        {user.data.weeklyStatus?.emailUpdate ? 'true' : false}
                      </TableCell>
                    )}

                    <BonusCell className={'md:hidden'} user={user} textAlign={'center'} />

                    <LottoTicketsCell className={'md:hidden'} user={user} textAlign={'center'} />

                    <LifetimeLossCell className={'md:hidden'} user={user} textAlign={'center'} />

                    {hasFreeBet && <FreeBetCell className={'md:hidden'} user={user} textAlign={'center'} />}

                    <TableCell className={'md:hidden'} collapsing textAlign={'center'}>
                      {/*Predictions*/}
                      {user.data.weeklyStatus?.predictions ?? 0}
                    </TableCell>
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

                    {/*<LastLoginCell className={'md:flex-1 md:!text-right'} textAlign={'center'} user={user} />*/}
                    <ActiveCell className={'md:flex-1 md:!text-right'} textAlign={'center'} user={user} />
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter className={'bg-neutral-800 sticky bottom-0 z-10'}>
              <TableRow>
                <TableHeaderCell colSpan={100}>
                  <div className={'flex flex-row justify-between items-center w-full'}>
                    <span className={''}>{`Total Users ${list.length}`}</span>
                    <div className={'filter-wrap'}>
                      <Button
                        compact
                        onClick={handleOrderByStatus}
                        className={'!bg-green-dark !pt-1 !pb-1'}
                        size={'small'}
                        filter={UserStatusModel.IsDone}
                      >
                        Done {!!statusCount[UserStatusModel.IsDone] && `#${statusCount[UserStatusModel.IsDone]}`}
                      </Button>
                      <Button
                        compact
                        onClick={handleOrderByStatus}
                        className={'!bg-yellow-dark !pt-1 !pb-1'}
                        size={'small'}
                        filter={UserStatusModel.InProgress}
                      >
                        InProgress{' '}
                        {!!statusCount[UserStatusModel.InProgress] && `#${statusCount[UserStatusModel.InProgress]}`}
                      </Button>
                      <Button
                        compact
                        onClick={handleOrderByStatus}
                        className={'!bg-red-dark !pt-1 !pb-1'}
                        size={'small'}
                        filter={UserStatusModel.IsWaiting}
                      >
                        Waiting{' '}
                        {!!statusCount[UserStatusModel.IsWaiting] && `#${statusCount[UserStatusModel.IsWaiting]}`}
                      </Button>
                    </div>
                  </div>
                </TableHeaderCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Form>
      </div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};
UserListComponent.displayName = 'UserList';
export default UserListComponent;
