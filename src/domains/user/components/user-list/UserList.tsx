import { FC } from 'react';
import useUserList from '@domains/user/hooks/useUserList.tsx';

interface UserListProps {
}

const UserListComponent: FC<UserListProps> = () => {
  useUserList();

  return (
    <div data-testid='UserList'>
      UserList Component
    </div>
  );
};
UserListComponent.displayName = 'UserList';
export default UserListComponent;
