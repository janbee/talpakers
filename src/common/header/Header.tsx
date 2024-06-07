import { FC } from 'react';

interface HeaderProps {}

const HeaderComponent: FC<HeaderProps> = () => (
  <div data-testid="Header">
    Header Component
  </div>
);
HeaderComponent.displayName = 'Header'
export default HeaderComponent;
