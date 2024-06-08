import { FC } from 'react';
import useUserList from '@domains/user/hooks/useUserList.tsx';
import { Dimmer, Loader, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { AppBuildCell, StatusCell } from '@domains/user/components/user-list/UserTableCell.tsx';


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
            <TableHeaderCell>App Build</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Version</TableHeaderCell>
            <TableHeaderCell>
              Weekly Summary <br />
              (Bonus + Earnings = Total)
            </TableHeaderCell>
            <TableHeaderCell>
              Weekly <br />
              Progress
            </TableHeaderCell>
            <TableHeaderCell>
              Bets
            </TableHeaderCell>
            <TableHeaderCell>
              Next Withdrawal
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
                <TableCell>John Lilki</TableCell>
                <AppBuildCell user={user} />
                <StatusCell user={user} />
                <TableCell>jhlilk22@yahoo.com</TableCell>
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
