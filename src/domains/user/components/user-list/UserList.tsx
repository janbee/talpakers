import { FC } from 'react';

interface UserListProps {}

const UserListComponent: FC<UserListProps> = () => (
  <div data-testid="UserList">
    UserList Component
  </div>
);
UserListComponent.displayName = 'UserList'
export default UserListComponent;
