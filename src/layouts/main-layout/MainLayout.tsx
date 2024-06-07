import { FC, ReactNode } from 'react';
import HeaderComponent from '../../common/header/Header.tsx';

interface MainLayoutProps {
  children: ReactNode
}

const MainLayoutComponent: FC<MainLayoutProps> = ({ children }) => (
  <div data-testid='MainLayout'>
    <HeaderComponent />
    <div className={'content'}>
      {children}
    </div>
  </div>
);
MainLayoutComponent.displayName = 'MainLayout';
export default MainLayoutComponent;
