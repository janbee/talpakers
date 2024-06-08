import { FC } from 'react';
import useUserList from '@domains/user/hooks/useUserList.tsx';
import { Dimmer, Loader, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import {
  AppBuildCell,
  BetsCell,
  NextWithdrawalCell,
  StatusCell,
  WeeklyProgressCell,
  WeeklySummaryCell,
} from '@domains/user/components/user-list/UserTableCell.tsx';


const UserListComponent: FC = () => {
  const { list, loading } = useUserList();


  console.log('gaga-------------------------------------UserListComponent render', list, loading);
  return (
    <div
      data-testid='UserList'
      className={'p-4 w-full h-full'}>

      <Table
        striped
        size={'small'}
        inverted>
        <TableHeader className={'bg-neutral-900'}>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell textAlign={'center'}>App Build</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Version</TableHeaderCell>
            <TableHeaderCell
              textAlign={'center'}
              className={'min-w-[175px]'}>
              Weekly Summary <br />
              (Bonus + Earnings = Total)
            </TableHeaderCell>
            <TableHeaderCell
              textAlign={'center'}
              className={'min-w-[74px]'}>
              Weekly <br />
              Progress
            </TableHeaderCell>
            <TableHeaderCell>
              Bets
            </TableHeaderCell>
            <TableHeaderCell
              textAlign={'center'}
              className={'max-w-[105px]'}>
              Next <br />
              Withdrawal
            </TableHeaderCell>
            <TableHeaderCell>
              Active
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {list.map(user => {
            return (
              <TableRow key={user._id}>
                <TableCell></TableCell>
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
                <TableCell>No</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};
UserListComponent.displayName = 'UserList';
export default UserListComponent;
