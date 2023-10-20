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
import { Simulate } from "react-dom/test-utils";
import progress = Simulate.progress;

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
        <Table celled striped selectable inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Active</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {state.data?.map((user) => {
              return (
                <Table.Row key={user._id} onClick={handleUserDetails(user)}>
                  <Table.Cell collapsing>{user._id}</Table.Cell>
                  <Table.Cell collapsing>
                    <span
                      className={classNames({
                        status: true,
                        done: user.data?.isDoneForTheWeek === true,
                        "in-progress": user.data?.isDoneForTheWeek === false,
                        unknown: user.data?.isDoneForTheWeek === undefined,
                      })}
                    />
                  </Table.Cell>
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
        <ElementComponent loading={state.loading} />
      </Segment>
      <Outlet />
    </div>
  );
});
