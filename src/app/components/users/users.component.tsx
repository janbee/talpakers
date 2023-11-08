import React, { memo } from "react";
import "./users.component.scss";
import { Icon, Segment, Table } from "semantic-ui-react";
import { useApi, useCallbackMemo } from "@utilities/utils";
import { UserModel } from "@models/custom.models";
import { API } from "@services/api.service";
import moment from "moment";
import { Outlet, useNavigate } from "react-router-dom";
import { ElementComponent } from "@app/shared/component/element-loader.component";
import classNames from "classnames";

export const UsersComponent = memo(() => {
  const state = useApi<UserModel[]>(() => API.getUsers(), {
    withLoading: false,
  });

  const navigate = useNavigate();

  const handleUserDetails = useCallbackMemo((user: UserModel) => {
    const currentLocation = JSON.stringify(window.location.href);
    navigate(`@${user._id}`, {
      relative: "route",
      replace: currentLocation.includes("@"),
    });
  }, []);

  return (
    <div className="users-wrap">
      <Segment inverted>
        <div className="row-wrap between ttl-wrap">
          <span className="ttl">Users</span>
          <Icon onClick={state.reload} name="refresh" />
        </div>
        <hr />
        <div className="tbl-wrap">
          <Table celled striped selectable inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Version</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Active</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {state.data?.map((user) => {
                const tz = new Date().getTimezoneOffset() * 60000;
                const today = new Date(new Date().getTime() - tz);
                today.setUTCHours(0, 0, 0, 0);

                const currentWeekDay = today.getDay();

                const forWeekStart = new Date(today);
                forWeekStart.setUTCHours(0, 0, 0, 0);
                forWeekStart.setDate(today.getDate() - currentWeekDay);

                const weekStart = new Date(forWeekStart);
                weekStart.setUTCHours(0, 0, 0, 0);

                const forWeekEnd = new Date(weekStart);
                forWeekEnd.setUTCHours(0, 0, 0, 0);
                forWeekEnd.setDate(weekStart.getDate() + 6);

                const weekEnd = new Date(forWeekEnd);
                weekEnd.setUTCHours(23, 59, 59, 999);

                console.log(
                  "gaga------------------------------------",
                  JSON.stringify(
                    {
                      u: user._id,
                      web:
                        weekStart.toISOString() +
                        " --- " +
                        weekEnd.toISOString(),
                      app: user.data?.weekStatus?.startDate,
                      today,
                      today2: new Date(),
                    },
                    null,
                    2,
                  ),
                );

                return (
                  <Table.Row key={user._id} onClick={handleUserDetails(user)}>
                    <Table.Cell collapsing>{user._id}</Table.Cell>
                    <Table.Cell collapsing>
                      <span
                        className={classNames({
                          status: true,
                          done: user.data?.weekStatus?.done === true,
                          "in-progress": user.data?.weekStatus?.done === false,
                          unknown: user.data?.weekStatus?.done === undefined,
                          waiting:
                            weekStart.toISOString() !==
                            user.data?.weekStatus?.startDate,
                        })}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>{user.data?.version}</Table.Cell>
                    <Table.Cell textAlign="right">
                      {moment(user.updatedAt || user.createdAt).fromNow()}
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
