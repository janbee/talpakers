import React, { FormEvent, memo, useCallback, useMemo } from "react";
import "./users.component.scss";
import {
  Checkbox,
  CheckboxProps,
  Icon,
  Progress,
  Segment,
  Table,
} from "semantic-ui-react";
import {
  GetColor,
  GetDates,
  Money,
  useApi,
  useCallbackMemo,
} from "@utilities/utils";
import { UserDetailModel } from "@models/custom.models";
import { API } from "@services/api.service";
import moment from "moment";
import { Outlet, useNavigate } from "react-router-dom";
import { ElementComponent } from "@app/shared/component/element-loader.component";
import classNames from "classnames";

interface CustomUserModel extends UserDetailModel {
  checked?: boolean;
}

export const UsersComponent = memo(() => {
  const state = useApi<CustomUserModel[]>(() => API.getUsers(), {
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
        relative: "route",
        replace: currentLocation.includes("@"),
      });
    },
    [navigate],
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
        .join(",");

      navigate(emails?.length === 0 ? "" : `@${emails}`, {
        relative: "route",
        replace: currentLocation.includes("@"),
      });
    },
    [accounts, currentLocation, navigate],
  );

  const selected = currentLocation
    .replaceAll('"', "")
    .split("/")
    .pop()
    ?.replace("@", "");

  const getInProgressUsersCount = useMemo(() => {
    return (
      state.data?.filter((user) => {
        const inProgress = user.data?.weekStatus?.done === false;
        const lastUpdate = moment(user.updatedAt || user.createdAt);
        const duration = moment.duration(lastUpdate.diff(Date.now()));
        const minutesPassed = Math.abs(duration.asMinutes());
        return inProgress && minutesPassed < 30;
      })?.length || 0
    );
  }, [state.data]);

  return (
    <div
      className={classNames({
        "users-wrap": true,
      })}
    >
      <Segment inverted>
        <div className="row-wrap between ttl-wrap">
          <div>
            <span className="ttl">Users</span>
            {!!accounts.length && (
              <span className="ttl">
                ({accounts.filter((item) => item.checked).length})
              </span>
            )}
          </div>
          <Icon onClick={state.reload} name="refresh" />
        </div>
        <hr />
        <div className="tbl-wrap">
          <Table celled striped selectable inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className={"multi-select"} textAlign="center">
                  #
                </Table.HeaderCell>
                <Table.HeaderCell>App</Table.HeaderCell>
                <Table.HeaderCell>
                  Status{" "}
                  {!!getInProgressUsersCount && `#${getInProgressUsersCount}`}
                </Table.HeaderCell>
                <Table.HeaderCell>Version</Table.HeaderCell>

                <Table.HeaderCell
                  className={"weekly-summary"}
                  textAlign="center"
                >
                  Weekly Summary
                  <br />
                  (Bonus + Earnings = Total)
                </Table.HeaderCell>
                <Table.HeaderCell
                  className={"weekly-progress"}
                  textAlign="center"
                >
                  Weekly Progress
                </Table.HeaderCell>
                <Table.HeaderCell className={"last-update"} textAlign="right">
                  Active
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {state.data?.map((user, index) => {
                const { weekStart } = GetDates();

                const inProgress = user.data?.weekStatus?.done === false;
                const lastUpdate = moment(user.updatedAt || user.createdAt);
                const duration = moment.duration(lastUpdate.diff(Date.now()));
                const minutesPassed = Math.abs(duration.asMinutes());
                let isIdle = false;
                if (inProgress && minutesPassed >= 30) {
                  isIdle = true;
                }

                const waiting =
                  weekStart.toISOString() !== user.data?.weekStatus?.startDate;
                let totalStaked =
                  user.data?.weekStatus?.betSummary?.betSummary.totalStaked ||
                  0;
                let totalEarnings =
                  user.data?.weekStatus?.betSummary?.betSummary.totalEarnings ||
                  0;
                let bonus =
                  user.data?.weekStatus?.betSummary?.betSummary.bonus || 0;
                let winnings =
                  user.data?.weekStatus?.betSummary?.betSummary.winnings || 0;
                if (waiting) {
                  totalStaked = 0;
                  totalEarnings = 0;
                  bonus = 0;
                  winnings = 0;
                }

                const bgColor =
                  minutesPassed > 30
                    ? GetColor(29)
                    : GetColor(Math.floor(minutesPassed));

                const checkedUsed = accounts.find(
                  (item) => item.build === user.build,
                );

                const selectedUsers = accounts
                  .filter((item) => item.checked)
                  .map((item) => item.build);

                const emailArr = selected?.split(",") || [];

                return (
                  <Table.Row
                    className={classNames({
                      selected:
                        selectedUsers.includes(user.build) ||
                        emailArr.includes(user._id),
                    })}
                    key={user._id}
                    onClick={handleUserDetails(user)}
                  >
                    <Table.Cell
                      selectable
                      className={"multi-select"}
                      textAlign="center"
                    >
                      <Checkbox
                        value={JSON.stringify(user)}
                        checked={!!checkedUsed?.checked}
                        onChange={handleSetAccounts}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <span>{user.build}</span>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <span
                        className={classNames({
                          status: true,
                          done: user.data?.weekStatus?.done === true,
                          "in-progress": inProgress,
                          unknown: user.data?.weekStatus?.done === undefined,
                          waiting: waiting || isIdle,
                        })}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>{user.data?.version}</Table.Cell>

                    <Table.Cell textAlign="center">
                      <span
                        className={classNames({
                          win: bonus > 0,
                          lose: bonus < 0,
                        })}
                      >
                        {Money(bonus)}
                      </span>
                      {" + "}
                      <span
                        className={classNames({
                          win: totalEarnings > 0,
                          lose: totalEarnings < 0,
                        })}
                      >
                        {Money(totalEarnings)}
                      </span>
                      {" = "}
                      <span
                        className={classNames({
                          win: winnings > 0,
                          lose: winnings < 0,
                        })}
                      >
                        {Money(winnings)}
                      </span>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Progress
                        indicating
                        inverted
                        success={
                          user.data?.weekStatus?.done === true &&
                          totalStaked !== 0
                        }
                        precision={0}
                        value={Math.floor(totalStaked)}
                        progress={"percent"}
                        total={385}
                        label={Money(totalStaked)}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <span style={{ color: bgColor }}>
                        {lastUpdate.fromNow()}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="100">
                  Total Users {state.data?.length}
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
