import * as React from 'react';
import { CSSProperties, FC, useCallback, useEffect, useMemo } from 'react';
import useUserList from '@domains/user/hooks/useUserList.tsx';
import {
  Checkbox,
  Dimmer,
  Divider,
  Form,
  FormField,
  Loader,
  Table,
  TableBody,
  TableCell,
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
import { UserDetailModel } from '@api/index.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckboxProps } from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import { endOfWeek, format, getISOWeeksInYear, setISOWeek, startOfWeek } from 'date-fns';


const UserListComponent: FC = () => {
  const { list, loading } = useUserList();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedUserMemo = useMemo<Map<string, boolean>>(() => {
    const usersFromUrl = location.pathname.replace('/users/', '').split(',').filter(Boolean);
    const users = new Map<string, boolean>();

    usersFromUrl.forEach(item => {
      users.set(item, true);
    });

    return users;
  }, [location.pathname]);

  const handleRowClick = useCallback((user: UserDetailModel) => () => {
    selectedUserMemo.clear();
    selectedUserMemo.set(user._id, true);

    navigate(`./${user._id}`, { relative: 'route', replace: location.pathname.includes('@') });
  }, [location.pathname, navigate, selectedUserMemo]);


  const handleCheckboxMultiUserChange = useCallback((event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
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

  }, [location.pathname, navigate, selectedUserMemo]);


  console.log('gaga-------------------------------------UserListComponent render');


  useEffect(() => {

    const isoWeeksNumber = getISOWeeksInYear(Date.now());
    const weekInfo = Array.from({ length: isoWeeksNumber }, (_, i) => i + 1).map((weekNumber) => {

      const year = format(Date.now(), 'yyyy');
      const date = setISOWeek(Date.now(), weekNumber).toISOString();
      const mon = format(date, 'MMM');
      const monNumber = format(date, 'M');

      const startDate = startOfWeek(date, { weekStartsOn: 2 }).toISOString();
      const endDate = endOfWeek(startDate, { weekStartsOn: 0 }).toISOString();


      const weekStart = new Date(startDate);
      const weekEnd = new Date(endDate);
      weekStart.setUTCHours(0, 0, 0, 0);
      weekEnd.setUTCHours(23, 59, 59, 999);


      return {
        weekNumber,
        mon,
        monNumber,
        year,
        date,
        startDate,
        endDate,
        weekStart,
        weekEnd,

        gaga: format(startDate, 'MM-dd-yyyy'),
      };


    });

    console.log('gaga-------asdasd------------------------------', weekInfo);
  }, []);

  return (
    <div
      data-testid='UserList'
      className={'w-full m-4 bg-neutral-800 rounded-lg relative [&:has(+[data-testid="UserDetails"])]:mr-0'}>
      <div className={'flex flex-col p-4 h-full'}>
        <div className={'h-12'}>
          <span className={'dark:text-white text-2xl'}>Users</span>
        </div>
        <hr />
        <Form className={'flex-1 overflow-auto mt-4'}>
          <Table
            size={'small'}
            selectable
            compact
            striped
            celled
            inverted>
            <TableHeader className={'bg-neutral-900 sticky top-0 z-10'}>
              <TableRow>
                <TableHeaderCell collapsing>#</TableHeaderCell>
                <TableHeaderCell
                  collapsing
                  textAlign={'center'}>App Build</TableHeaderCell>
                <TableHeaderCell
                  collapsing
                  textAlign={'center'}>Status</TableHeaderCell>
                <TableHeaderCell collapsing>Version</TableHeaderCell>
                <TableHeaderCell
                  collapsing
                  textAlign={'center'}
                  className={'min-w-[205px]'}>
                  Weekly Summary <br />
                  (Bonus + Earnings = Total)
                </TableHeaderCell>
                <TableHeaderCell
                  textAlign={'center'}
                  className={'min-w-[74px]'}>
                  Weekly <br />
                  Progress
                </TableHeaderCell>
                <TableHeaderCell
                  collapsing
                  className={'min-w-[60px]'}>
                  Bets
                </TableHeaderCell>
                <TableHeaderCell
                  collapsing
                  textAlign={'center'}
                  className={'min-w-[105px]'}>
                  Next <br />
                  Withdrawal
                </TableHeaderCell>
                <TableHeaderCell
                  collapsing
                  textAlign={'center'}
                  className={'min-w-[100px]'}>
                  Active
                </TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {list.map((user) => {
                return (
                  <TableRow
                    key={user._id}
                    onClick={handleRowClick(user)}>
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
                    <StatusCell
                      textAlign={'center'}
                      user={user} />
                    <TableCell collapsing>{user.data?.version}</TableCell>
                    <WeeklySummaryCell
                      textAlign={'center'}
                      user={user} />
                    <WeeklyProgressCell
                      textAlign={'center'}
                      user={user} />
                    <BetsCell user={user} />
                    <NextWithdrawalCell user={user} />
                    <ActiveCell
                      textAlign={'center'}
                      user={user} />
                  </TableRow>
                );
              })}
            </TableBody>
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
