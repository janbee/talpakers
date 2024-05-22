import React, { FormEvent, memo, useCallback, useMemo } from 'react';
import './users.component.scss';
import { Checkbox, CheckboxProps, Icon, Segment, Table } from 'semantic-ui-react';
import { useApi, useCallbackMemo } from '@utilities/utils';
import { UserDetailModel } from '@models/custom.models';
import { API } from '@services/api.service';
import { Outlet, useNavigate } from 'react-router-dom';
import { ElementComponent } from '@app/shared/component/element-loader.component';
import classNames from 'classnames';
import {
  BetsCol,
  BuildCol,
  LastUpdateCol,
  NextWithdrawalCol,
  ProgressCol,
  StatusCol,
  UserStatusCount,
  WeekSummaryCol,
} from '@components/users/users.ui.component';

interface CustomUserModel extends UserDetailModel {
  checked?: boolean;
}

export const UsersComponent = memo(() => {
  const [state] = useApi<CustomUserModel[]>(() => API.getUsers(), {
    withLoading: false,
  });

  const accounts = useMemo<CustomUserModel[]>(() => {
    return [];
  }, []);

  const currentLocation = JSON.stringify(window.location.href);
  const navigate = useNavigate();

  const handleUserDetails = useCallbackMemo(
    (user: CustomUserModel) => {
      accounts.length = 0;
      user.checked = true;
      accounts.push(user);
      navigate(`@${user._id}`, {
        relative: 'route',
        replace: currentLocation.includes('@'),
      });
    },
    [navigate]
  );

  const handleSetAccounts = useCallback(
    (event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      event.stopPropagation();
      const user = JSON.parse(data.value as string) as CustomUserModel;

      const foundUser = accounts.find((item) => item.build === user.build);
      if (foundUser) {
        foundUser.checked = data.checked;
      } else {
        user.checked = data.checked;
        accounts.push(user);
      }

      const emails = accounts
        .filter((item) => item.checked === true)
        .map((item) => item._id)
        .join(',');

      navigate(emails?.length === 0 ? '' : `@${emails}`, {
        relative: 'route',
        replace: currentLocation.includes('@'),
      });
    },
    [accounts, currentLocation, navigate]
  );

  const selected = currentLocation.replaceAll('"', '').split('/').pop()?.replace('@', '');

  const handleStatusFilterClick = useCallback((e: React.SyntheticEvent<HTMLElement>, data: any) => {
    e.preventDefault();
    const value = data['data-value'];
    console.log('gaga-------------------------------------', data, value);
    state.reload?.(value);
  }, []);

  return (
    <div
      className={classNames({
        'users-wrap': true,
      })}
    >
      <Segment inverted>
        <div className="ttl">
          <div>
            <span>Users</span>
            {!!accounts.length && <span>({accounts.filter((item) => item.checked).length})</span>}
          </div>
          <Icon size={'small'} className={'pointer'} onClick={state.reload} name="refresh" />
        </div>
        <hr />
        <div className="tbl-wrap">
          <Table celled striped selectable inverted compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className={'multi-select'} textAlign="center">
                  #
                </Table.HeaderCell>
                <Table.HeaderCell>App</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" className={'status'}>
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell>Version</Table.HeaderCell>

                <Table.HeaderCell className={'weekly-summary'} textAlign="center">
                  Weekly Summary
                  <br />
                  (Bonus + Earnings = Total)
                </Table.HeaderCell>
                <Table.HeaderCell className={'weekly-progress'} textAlign="center">
                  Weekly Progress
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center" className={'bets'}>
                  Bets
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center" className={'next-withdrawal'}>
                  Next Withdrawal
                </Table.HeaderCell>
                <Table.HeaderCell className={'last-update'} textAlign="right">
                  Active
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {state.data?.map((user) => {
                const checkedUsed = accounts.find((item) => item.build === user.build);
                const selectedUsers = accounts.filter((item) => item.checked).map((item) => item.build);
                const emailArr = selected?.split(',') || [];

                return (
                  <Table.Row
                    className={classNames({
                      selected: selectedUsers.includes(user.build) || emailArr.includes(user._id),
                    })}
                    key={user._id}
                    onClick={handleUserDetails(user)}
                  >
                    <Table.Cell selectable className={'multi-select'} textAlign="center">
                      <Checkbox
                        value={JSON.stringify(user)}
                        checked={!!checkedUsed?.checked}
                        onChange={handleSetAccounts}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <BuildCol user={user} />
                    </Table.Cell>
                    <Table.Cell collapsing textAlign="center" className={'status'}>
                      <StatusCol loading={state.loading} user={user} />
                    </Table.Cell>
                    <Table.Cell collapsing>{user.data?.version}</Table.Cell>

                    <Table.Cell textAlign="center" className={'week-summary'}>
                      <WeekSummaryCol user={user} />
                    </Table.Cell>
                    <Table.Cell textAlign="right" className={'progress'}>
                      <ProgressCol user={user} />
                    </Table.Cell>
                    <Table.Cell textAlign="center" className={'bets'}>
                      <BetsCol user={user} />
                    </Table.Cell>
                    <Table.Cell textAlign="center" className={'bets'}>
                      <NextWithdrawalCol user={user} />
                    </Table.Cell>
                    <Table.Cell textAlign="right" className={'last-login'}>
                      <LastUpdateCol user={user} />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="100">
                  <div className={'footer-wrap'}>
                    <span>Total Users {state.data?.length}</span>
                    <UserStatusCount users={state.data} onClick={handleStatusFilterClick} />
                  </div>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
        <ElementComponent loading={state.loading} />
      </Segment>
      <Outlet />
    </div>
  );
});
