import MainLayoutComponent from '@layouts/main-layout/MainLayout';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { UserList } from '@domains/user';

const Page: FC = () => (
  <MainLayoutComponent>
    <div data-testid='Users'>
      Users Page
      <UserList />

      <Outlet />
    </div>
  </MainLayoutComponent>

);
Page.displayName = 'Users';
export default Page;
