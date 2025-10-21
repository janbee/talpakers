import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import MainLayoutComponent from "../../layouts/main-layout/MainLayout";
import { UserList } from "../../domains/user";

const Page: FC = () => (
  <MainLayoutComponent>
    <div data-testid="Users" className={'w-full flex flex-row overflow-auto'}>
      <UserList />

      <Outlet />
    </div>
  </MainLayoutComponent>
);
Page.displayName = 'Users';
export default Page;
