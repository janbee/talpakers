import { CSSProperties, FC, FormEvent, LegacyRef, MutableRefObject, useCallback, useMemo, useRef } from 'react';
import useUserList from '@domains/user/hooks/useUserList.tsx';
import {
  Checkbox,
  CheckboxProps,
  Dimmer,
  Form,
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
import { debounce } from 'lodash';


const UserListComponent: FC = () => {
  const { list, loading } = useUserList();
  const formRef = useRef<HTMLFormElement>(null);

  const handleRowClick = useCallback((user: UserDetailModel) => () => {
    console.log('gaga---------------------asdasasd----------------', user);
  }, []);


  const debounceMemo = useMemo(() => {
    return debounce((data: CheckboxProps) => {
      console.log('gaga-------------------------------------debounceMemo', data);
    }, 2500);
  }, []);

  const handleCheckboxMultiUserChange = useCallback((event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    event.stopPropagation();
    console.log('gaga-----------------------------123--------', data);

    debounceMemo(data);
  }, [debounceMemo]);

  console.log('gaga-------------------------------------UserListComponent render', list, loading);
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
            {list.map(user => {
              return (
                <TableRow
                  key={user._id}
                  onClick={handleRowClick(user)}>
                  <TableCell>
                    <Checkbox
                      value={user._id}
                      style={{ '--cb-size': '15px' } as CSSProperties}
                      className={'max-w-[25px] h-[5px] mt-1'}
                      toggle
                      onChange={handleCheckboxMultiUserChange}
                    />
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
