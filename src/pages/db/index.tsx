import { FC } from 'react';
import MainLayoutComponent from '../../layouts/main-layout/MainLayout';
import DBTable from '../../domains/db/components/db-table/DBTable';

/**
 * Database Usage Page
 * Displays database storage usage statistics and per-table breakdown
 */
const Page: FC = () => (
  <MainLayoutComponent>
    <div data-testid="DBPage" className="w-full flex flex-row overflow-auto">
      <DBTable />
    </div>
  </MainLayoutComponent>
);

Page.displayName = 'DBPage';

export default Page;
