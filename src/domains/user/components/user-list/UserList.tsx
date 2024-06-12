import * as React from 'react';
import { CSSProperties, FC, useCallback, useMemo } from 'react';
import useUserList from '@domains/user/hooks/useUserList';
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
import {
  ActiveCell,
  AppBuildCell,
  BetsCell,
  NextWithdrawalCell,
  StatusCell,
  WeeklyProgressCell,
  WeeklySummaryCell,
} from '@domains/user/components/user-list/UserTableCell.tsx';
import { UserDetailModel, UserStatusModel } from '@api/index.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckboxProps } from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';

const UserListComponent: FC = () => {
  const { list, loading, handleOrderByStatus, statusCount } = useUserList();
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
    (user: UserDetailModel) => () => {
      selectedUserMemo.clear();
      selectedUserMemo.set(user._id, true);

      navigate(`./${user._id}`, { relative: 'route', replace: location.pathname.includes('@') });
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

      navigate(`./${joinUser.join(',')}`, { relative: 'route', replace: location.pathname.includes('@') });
    },
    [location.pathname, navigate, selectedUserMemo]
  );

  console.log('gaga-------------------------------------UserListComponent render');
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
            className={'cursor-pointer pt-1 !text-xl'}
            onClick={handleOrderByStatus}
            name="refresh"
          />
        </div>
        <hr />
        <Form className={'flex-1 overflow-auto mt-4'}>
          <Table size={'small'} selectable compact striped celled inverted>
            <TableHeader className={'bg-neutral-900 sticky top-0 z-10'}>
              <TableRow>
                <TableHeaderCell collapsing>#</TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'}>
                  App Build
                </TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'}>
                  Status
                </TableHeaderCell>
                <TableHeaderCell collapsing>Version</TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[205px]'}>
                  Weekly Summary <br />
                  (Bonus + Earnings = Total)
                </TableHeaderCell>
                <TableHeaderCell textAlign={'center'} className={'min-w-[74px]'}>
                  Weekly <br />
                  Progress
                </TableHeaderCell>
                <TableHeaderCell collapsing className={'min-w-[60px]'}>
                  Bets
                </TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[105px]'}>
                  Next <br />
                  Withdrawal
                </TableHeaderCell>
                <TableHeaderCell collapsing textAlign={'center'} className={'min-w-[105px]'}>
                  Active
                </TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {list.map((user) => {
                return (
                  <TableRow key={user._id} onClick={handleRowClick(user)}>
                    <TableCell>
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
                    <AppBuildCell user={user} />
                    <StatusCell textAlign={'center'} user={user} />
                    <TableCell collapsing>{user.data?.version}</TableCell>
                    <WeeklySummaryCell textAlign={'center'} user={user} />
                    <WeeklyProgressCell textAlign={'center'} user={user} />
                    <BetsCell user={user} />
                    <NextWithdrawalCell user={user} />
                    <ActiveCell textAlign={'center'} user={user} />
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
