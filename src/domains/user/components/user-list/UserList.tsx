import { CSSProperties, FC, FormEvent, useCallback, useMemo, useRef } from 'react';
import useUserList from '@domains/user/hooks/useUserList.tsx';
import {
  Checkbox,
  CheckboxProps,
  Dimmer,
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

interface CustomUserDetailModel extends UserDetailModel {
  checked?: boolean;
}

const UserListComponent: FC = () => {
  const { list, loading }: { list: CustomUserDetailModel[], loading: boolean } = useUserList();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const location = useLocation();


  const handleRowClick = useCallback((user: UserDetailModel) => () => {
    list.forEach((item) => {
      item.checked = item._id === user._id;
    });

    navigate(`./${user._id}`, { relative: 'route', replace: location.pathname.includes('@') });
  }, [list, navigate]);

  const handleCheckboxMultiUserChange = useCallback((event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    event.stopPropagation();
    const foundItem = list.find(item => item._id === data.value);

    if (foundItem && data.checked) {
      foundItem.checked = true;
    } else if (foundItem) {
      foundItem.checked = false;
    }

    const selectedUsers = list.filter(item => item.checked).map(item => item._id).join(',');
    navigate(`./${selectedUsers}`, { relative: 'route', replace: location.pathname.includes('@')  });
  }, [list, navigate]);


  const defaultCheckedList = useMemo(() => {
    const selectedUsers = location.pathname.replace('/users/', '').split(',').filter(Boolean);

    list.forEach(item => {
      if (selectedUsers.includes(item._id)) {
        item.checked = true;
      }
    });

    return selectedUsers;
  }, [location, list]);


  console.log('gaga-------------------------------------UserListComponent render', list);
  return (
    <div
      data-testid='UserList'
      className={'p-4 w-full h-full'}>

      <Form ref={formRef}>

        <Table
          size={'small'}
          selectable
          compact
          striped
          celled
          inverted>
          <TableHeader className={'bg-neutral-900'}>
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
            {list.map((user: CustomUserDetailModel) => {
              return (
                <TableRow
                  key={user._id}
                  onClick={handleRowClick(user)}>
                  <TableCell>
                    <FormField>
                      <Checkbox
                        defaultChecked={defaultCheckedList.includes(user._id)}
                        checked={user.checked}
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
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};
UserListComponent.displayName = 'UserList';
export default UserListComponent;
