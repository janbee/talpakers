import React, { memo } from "react";
import "./users.component.scss";
import { Segment, Table } from "semantic-ui-react";
import { useApi, useCallbackMemo } from "@utilities/utils";
import { UserModel } from "@models/custom.models";
import { API } from "@services/api.service";
import moment from "moment";
import { Outlet, useNavigate } from "react-router-dom";

export const UsersComponent = memo(() => {
  const state = useApi<UserModel[]>(API.getUsers());

  const navigate = useNavigate();

  const handleUserDetails = useCallbackMemo((user: UserModel) => {
    console.log(
      "gaga-------------------------------------",
      user,
      JSON.stringify(window.location.href),
    );
    const currentLocation = JSON.stringify(window.location.href);

    navigate(`@${user._id}`, {
      relative: "route",
      replace: currentLocation.includes("@"),
    });
  }, []);

  if (state.loading) return null;

  return (
    <div className="users-wrap">
      <Segment inverted>
        <div className="ttl">Users</div>
        <hr />
        <Table celled striped selectable inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Active</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {state.data?.map((user) => {
              return (
                <Table.Row key={user._id} onClick={handleUserDetails(user)}>
                  <Table.Cell collapsing>{user._id}</Table.Cell>
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
      </Segment>
      <Outlet />
    </div>
  );
});
