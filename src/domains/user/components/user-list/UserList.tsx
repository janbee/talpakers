import * as React from 'react';
import { CSSProperties, FC } from 'react';
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
import classNames from 'classnames';
import {
  ActiveCell,
  ActivePredictionCell,
  AppBuildCell,
  AutoLoginCell,
  BetRestrictedCell,
  BetsCell,
  BonusCell,
  FreeBetCell,
  LastWeekWinningsCell,
  LifetimeLossCell,
  LottoTicketsCell,
  NextWithdrawalCell,
  StatusCell,
  VersionCell,
  WeeklyProgressCell,
  WeeklySummaryCell,
} from './UserTableCell';
import useUserList from '../../hooks/useUserList';
import { UserColumnSortModel, UserStatusModel } from '../../../../api/rxjs-client/models/custom.models';
import { toMoney, UserSupabaseModel } from '@PlayAb/shared';

const UserListComponent: FC = () => {
  const {
    list,
    loading,
    handleOrderByStatus,
    statusCount,
    restrictedCount,
    hasFreeBet,
    handleRowClick,
    selectedUserMemo,
    handleCheckboxMultiUserChange,
    totals,
  } = useUserList();

  const tableCols = [
    {
      name: 'App Build',
      render: (user: UserSupabaseModel) => <AppBuildCell user={user} />,
    },
    {
      name: 'Status',
      render: (user: UserSupabaseModel) => <StatusCell user={user} />,
    },
    {
      name: 'Version',

      render: (user: UserSupabaseModel) => <VersionCell user={user} />,
    },
    {
      name: 'Weekly Summary <br /> (Bonus + Earnings = Total)',
      className: {
        'min-w-[205px]': true,
      },
      filter: UserColumnSortModel.Earnings,
      render: (user: UserSupabaseModel) => <WeeklySummaryCell user={user} />,
    },
    {
      name: 'Weekly <br /> Progress',
      className: {
        'min-w-[74px]': true,
      },
      collapsing: false,
      render: (user: UserSupabaseModel) => <WeeklyProgressCell user={user} />,
    },
    {
      name: 'Bets',
      className: {
        'min-w-[60px]': true,
      },
      filter: UserColumnSortModel.OpenBets,
      render: (user: UserSupabaseModel) => <BetsCell user={user} />,
    },
    {
      name: 'Next <br /> Withdrawal',
      className: {
        'min-w-[105px]': true,
      },
      filter: UserColumnSortModel.NextWithdrawal,
      render: (user: UserSupabaseModel) => <NextWithdrawalCell user={user} />,
    },
    {
      name: 'Bet <br /> Restricted',
      className: {
        'min-w-[75px]': true,
      },
      isVisible: !!restrictedCount,
      render: (user: UserSupabaseModel) => <BetRestrictedCell user={user} />,
    },
    {
      name: `Bonus <br /> (${toMoney(totals.bonus, 0)})`,
      className: {
        'min-w-[75px]': true,
      },
      render: (user: UserSupabaseModel) => <BonusCell user={user} />,
    },
    {
      name: `Earnings <br /> (${toMoney(totals.winnings, 0)})`,
      className: {
        'min-w-[75px]': true,
      },
      render: (user: UserSupabaseModel) => <LastWeekWinningsCell user={user} />,
    },
    {
      name: 'Tickets',
      className: {
        'min-w-[60px]': true,
      },
      render: (user: UserSupabaseModel) => <LottoTicketsCell user={user} />,
    },
    {
      name: 'Total <br /> Loss',
      className: {
        'min-w-[75px]': true,
      },
      render: (user: UserSupabaseModel) => <LifetimeLossCell user={user} />,
    },
    {
      name: 'Free <br /> Bet',
      className: {
        'min-w-[75px]': true,
      },
      isVisible: hasFreeBet,
      render: (user: UserSupabaseModel) => <FreeBetCell user={user} />,
    },
    {
      name: 'Active <br /> Predictions',
      className: {
        'min-w-[60px]': true,
      },
      render: (user: UserSupabaseModel) => <ActivePredictionCell user={user} />,
    },
    {
      name: 'Auto <br /> Login',
      className: {
        'min-w-[50px]': true,
      },
      render: (user: UserSupabaseModel) => <AutoLoginCell user={user} />,
    },
    {
      name: 'Active',
      className: {
        'min-w-[105px]': true,
      },
      filter: UserColumnSortModel.Active,
      render: (user: UserSupabaseModel) => <ActiveCell user={user} />,
    },
  ] as any;
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
                {tableCols.map(({ name, className, filter, isVisible, collapsing }: any) =>
                  isVisible === false ? null : (
                    <TableHeaderCell
                      key={name}
                      collapsing={collapsing === false ? undefined : true}
                      textAlign={'center'}
                      className={classNames({
                        relative: true,
                        ...className,
                      })}
                    >
                      <span dangerouslySetInnerHTML={{ __html: name }} />
                      {filter && (
                        <Button
                          className={'absolute top-0 right-0 bottom-0 left-0 opacity-0'}
                          inverted
                          onClick={handleOrderByStatus}
                          filter={filter}
                        />
                      )}
                    </TableHeaderCell>
                  )
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {list.map((user) => {
                return (
                  <TableRow
                    key={user._id}
                    className={classNames({
                      'md:flex md:flex-row md:flex-wrap': true,
                      'child:md:!border-0 child:relative': true,
                    })}
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
                    {/*<AppBuildCell user={user} />


                    <WeeklySummaryCell className={'md:flex-1'} textAlign={'center'} user={user} />

                    <WeeklyProgressCell className={'md:w-full'} textAlign={'center'} user={user} />

                    <BetsCell className={'md:w-[60px]'} user={user} />
                    <NextWithdrawalCell className={'md:hidden'} user={user} />

                    {!!restrictedCount && (
                      <BetRestrictedCell className={'md:hidden'} textAlign={'center'} user={user} />
                    )}

                    <BonusCell className={'md:hidden'} user={user} textAlign={'center'} />

                    <LastWeekWinnings className={'md:hidden'} textAlign={'center'} />

                    <LottoTicketsCell className={'md:hidden'}  textAlign={'center'} />

                    <LifetimeLossCell className={'md:hidden'} textAlign={'center'} />

                    {hasFreeBet && <FreeBetCell className={'md:hidden'} extAlign={'center'} />}

                    <TableCell className={'md:hidden'} collapsing textAlign={'center'}>
                      Predictions
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

                    <LastLoginCell className={'md:flex-1 md:!text-right'} textAlign={'center'} user={user} />
                    <ActiveCell className={'md:flex-1 md:!text-right'} textAlign={'center'} user={user} />*/}

                    {tableCols.map(({ render, isVisible }: any, index: number) => {
                      return <React.Fragment key={index}>{isVisible === false ? null : render(user)}</React.Fragment>;
                    })}
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
