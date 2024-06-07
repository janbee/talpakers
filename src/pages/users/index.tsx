import MainLayoutComponent from '@layouts/main-layout/MainLayout';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Page: FC = () => (
  <MainLayoutComponent>
    <div data-testid='Users'>
      Users Page

      <Outlet />
    </div>
  </MainLayoutComponent>

);
Page.displayName = 'Users';
export default Page;
