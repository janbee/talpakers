import { FC } from 'react';

interface UserDetailsProps {}

const UserDetailsComponent: FC<UserDetailsProps> = () => (
  <div data-testid="UserDetails">
    UserDetails Component
  </div>
);
UserDetailsComponent.displayName = 'UserDetails'
export default UserDetailsComponent;
