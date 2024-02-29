import React, {
  FormEvent,
  memo,
  SyntheticEvent,
  useCallback,
  useMemo,
} from "react";
import "./users.component.scss";
import {
  Checkbox,
  CheckboxProps,
  Dropdown,
  DropdownProps,
  Icon,
  Popup,
  Progress,
  Segment,
  Table,
} from "semantic-ui-react";
import {
  GetColor,
  GetDates,
  GetUserStatus,
  Money,
  useApi,
  useCallbackMemo,
  UserStatus,
} from "@utilities/utils";
import { UserDetailModel } from "@models/custom.models";
import { API } from "@services/api.service";
import moment from "moment";
import { Outlet, useNavigate } from "react-router-dom";
import { ElementComponent } from "@app/shared/component/element-loader.component";
import classNames from "classnames";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import alertCircle from "react-useanimations/lib/alertCircle";
import star from "react-useanimations/lib/star";
import { orderBy } from "lodash";

interface CustomUserModel extends UserDetailModel {
  checked?: boolean;
}

export const UsersComponent = memo(() => {
  const [state, setState] = useApi<CustomUserModel[]>(() => API.getUsers(), {
    withLoading: false,
  });

  const accounts = useMemo<CustomUserModel[]>(() => {
    return [];
  }, []);

  /*
   * commit
   * */
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

  const handleStatusFilter = useCallback(
    (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
      const sorted = orderBy(
        state.data,
        [
          (user) => {
            const userStatus = GetUserStatus(user);
            return userStatus === data.value;
          },
          "data.weekStatus.betSummary.betSummary.totalStaked",
        ],
        ["desc", "desc"],
      );
      setState((prevState) => ({ ...prevState, data: sorted }));
    },
    [state.data],
  );

  return (
    <div
      className={classNames({
        "users-wrap": true,
      })}
    >
      <Segment inverted>
        <div className="ttl">
          <div>
            <span>Users</span>
            {!!accounts.length && (
              <span>({accounts.filter((item) => item.checked).length})</span>
            )}
          </div>
          <Icon
            size={"small"}
            className={"pointer"}
            onClick={state.reload}
            name="refresh"
          />
        </div>
        <hr />
        <div className="tbl-wrap">
          <Table celled striped selectable inverted compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className={"multi-select"} textAlign="center">
                  #
                </Table.HeaderCell>
                <Table.HeaderCell>App</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" className={"status"}>
                  <Dropdown
                    text="Status"
                    closeOnChange={false}
                    onChange={handleStatusFilter}
                    options={[
                      {
                        key: UserStatus.IsDone,
                        value: UserStatus.IsDone,
                        text: "Done",
                      },
                      {
                        key: UserStatus.InProgress,
                        value: UserStatus.InProgress,
                        text: "InProgress",
                      },
                      {
                        key: UserStatus.IsWaiting,
                        value: UserStatus.IsWaiting,
                        text: "Waiting",
                      },
                    ]}
                  />
                  <br />
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
                <Table.HeaderCell textAlign="center" className={"bets"}>
                  Bets
                </Table.HeaderCell>
                <Table.HeaderCell className={"last-update"} textAlign="right">
                  Active
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {state.data?.map((user, index) => {
                const { weekStart } = GetDates();
                const userStatus = GetUserStatus(user);

                const isNewWeek =
                  weekStart.toISOString() !== user.data?.weekStatus?.startDate;
                const lastUpdate = moment(user.updatedAt || user.createdAt);
                const duration = moment.duration(lastUpdate.diff(Date.now()));
                const minutesPassed = Math.abs(duration.asMinutes());

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

                if (isNewWeek) {
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
                      {!!user.data.weekStatus?.withdrawal && (
                        <>
                          {[
                            {
                              Pending:
                                user.data.weekStatus?.withdrawal
                                  .TransactionStatus === "Pending",
                              Approved:
                                user.data.weekStatus?.withdrawal
                                  .TransactionStatus === "Approved",
                              Processing: [
                                "In Process",
                                "Sending to Processor",
                              ].includes(
                                user.data.weekStatus?.withdrawal
                                  .TransactionStatus,
                              ),
                            },
                          ].map((status, index) => (
                            <Popup
                              key={index}
                              position="right center"
                              trigger={
                                <div
                                  className={classNames({
                                    "has-withdrawal": true,
                                    yellow: status.Pending,
                                    green: status.Approved,
                                    blue: status.Processing,
                                  })}
                                />
                              }
                              flowing
                            >
                              <Popup.Header>
                                Withdrawal (
                                <span
                                  className={classNames({
                                    "yellow-light": status.Pending,
                                    "green-light": status.Approved,
                                    "blue-light": status.Processing,
                                  })}
                                >
                                  {
                                    user.data.weekStatus?.withdrawal
                                      ?.TransactionStatus
                                  }
                                </span>
                                )
                              </Popup.Header>
                              <Popup.Content>
                                {`${user.data.weekStatus?.withdrawal
                                  ?.PaymentMethodInfo} ${Money(
                                  user.data.weekStatus?.withdrawal?.Amount || 0,
                                )}`}
                              </Popup.Content>
                            </Popup>
                          ))}
                        </>
                      )}
                      <span>{user.build}</span>
                    </Table.Cell>
                    <Table.Cell
                      collapsing
                      textAlign="center"
                      className={"status"}
                    >
                      {!state.loading &&
                        [userStatus].map((s, statusInd) => {
                          let animation = star;
                          let color = "greenyellow";
                          if (s === UserStatus.InProgress) {
                            animation = activity;
                            color = "#fbbd08";
                          } else if (s === UserStatus.IsWaiting) {
                            animation = alertCircle;
                            color = "#ff5f5f";
                          }
                          return (
                            <UseAnimations
                              key={statusInd}
                              animation={animation}
                              size={25}
                              autoplay={true}
                              strokeColor={color}
                              loop={true}
                              speed={0.4}
                            />
                          );
                        })}
                    </Table.Cell>
                    <Table.Cell collapsing>{user.data?.version}</Table.Cell>

                    <Table.Cell textAlign="center" className={"week-summary"}>
                      <div className={"week-summary-wrap"}>
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
                      </div>
                    </Table.Cell>
                    <Table.Cell textAlign="right" className={"progress"}>
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
                        total={380}
                        label={Money(totalStaked)}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center" className={"bets"}>
                      {[
                        {
                          open:
                            user.data.weekStatus?.betSummary?.betSummary
                              .openBets || 0,
                          settled:
                            user.data.weekStatus?.betSummary?.betSummary
                              .settledBets || 0,
                        },
                      ].map(({ open, settled }, betsIndex) => {
                        return (
                          <div key={betsIndex}>
                            <span>{open}</span>
                            <span>{settled}</span>
                          </div>
                        );
                      })}
                    </Table.Cell>
                    <Table.Cell textAlign="right" className={"last-login"}>
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
