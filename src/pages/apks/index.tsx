import { FC } from 'react';
import MainLayoutComponent from '../../layouts/main-layout/MainLayout';
import ApksTable from '../../domains/apks/components/apks-table/ApksTable';

/**
 * APKs Page
 * Displays a list of APK files from Google Drive
 */
const Page: FC = () => (
  <MainLayoutComponent>
    <div data-testid="ApksPage" className="w-full flex flex-row overflow-auto">
      <ApksTable />
    </div>
  </MainLayoutComponent>
);

Page.displayName = 'ApksPage';

export default Page;

