import { FC } from 'react';
import { useParams } from 'react-router-dom';
import MainLayoutComponent from '../../../layouts/main-layout/MainLayout';
import { StateControl } from '../../../domains/state';

const Page: FC = () => {
  const { build } = useParams<{ build: string }>();
  return (
    <MainLayoutComponent>
      <div data-testid="State" className={'w-full h-full overflow-auto'}>
        {build ? <StateControl build={build} /> : <StateControl build="" />}
      </div>
    </MainLayoutComponent>
  );
};
Page.displayName = 'State';
export default Page;
