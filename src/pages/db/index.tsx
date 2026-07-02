import { FC } from 'react';
import MainLayoutComponent from '../../layouts/main-layout/MainLayout';
import { DbTable } from '../../domains/db';

const Page: FC = () => (
  <MainLayoutComponent>
    <div data-testid="DBPage" className={'w-full flex flex-row overflow-auto'}>
      <DbTable />
    </div>
  </MainLayoutComponent>
);

Page.displayName = 'DBPage';

export default Page;