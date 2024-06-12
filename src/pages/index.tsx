import { FC } from 'react';
import logo from '@assets/logo.png';
import { Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';
import { version } from '../../package.json';

const Page: FC = () => {
  return (
    <div data-testid="MainPage" className={'flex h-full items-center justify-center flex-col'}>
      <div
        className={'rounded-full overflow-hidden w-[100px] aspect-square flex items-center border-gray-700 border-8'}
      >
        <Popup
          content={`Talapkers v${version}`}
          open
          position="top center"
          trigger={
            <Link className={'h-full w-full'} title={'Users'} to={'users'}>
              <img className={'h-full'} src={logo} alt={'logo'} />
            </Link>
          }
        />
      </div>
    </div>
  );
};

Page.displayName = 'MainPage';
export default Page;
