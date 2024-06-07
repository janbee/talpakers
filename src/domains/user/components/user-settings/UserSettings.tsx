import { FC } from 'react';

interface UserSettingsProps {}

const UserSettingsComponent: FC<UserSettingsProps> = () => (
  <div data-testid="UserSettings">
    UserSettings Component
  </div>
);
UserSettingsComponent.displayName = 'UserSettings'
export default UserSettingsComponent;
