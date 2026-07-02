import { FC } from 'react';
import MainLayoutComponent from '../../layouts/main-layout/MainLayout';
import { YearlySummary } from '../../domains/yearly-summary';

const Page: FC = () => (
  <MainLayoutComponent>
    <div data-testid="YearlySummaryPage" className={'w-full flex flex-row overflow-auto'}>
      <YearlySummary />
    </div>
  </MainLayoutComponent>
);

Page.displayName = 'YearlySummaryPage';

export default Page;