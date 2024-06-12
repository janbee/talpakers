import { FC, ReactNode } from 'react';
import HeaderComponent from '../../common/header/Header.tsx';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayoutComponent: FC<MainLayoutProps> = ({ children }) => (
  <div data-testid="MainLayout" className={'h-full flex flex-col'}>
    <HeaderComponent />
    <div className={'content flex flex-1 w-full overflow-hidden bg-neutral-900'}>{children}</div>
  </div>
);
MainLayoutComponent.displayName = 'MainLayout';
export default MainLayoutComponent;
