import { FC } from 'react';
import logo from '@PlayAbWeb/assets/logo.png';
import { Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';
import { version } from '../../../../../package.json';
import dayjs from 'dayjs';
import { PredictionPopup } from '@PlayAbWeb/domains/prediction';

const HeaderComponent: FC = () => (
  <div data-testid="Header" className={'h-20 bg-black p-3 flex justify-between items-center'}>
    <Popup
      size={'mini'}
      content={`v${version} build ${dayjs(BUILD_DATE).fromNow()}`}
      position="right center"
      trigger={
        <Link className={'h-full inline-flex flex-row items-center'} to={'/'}>
          <div className={' rounded-full overflow-hidden h-[50px] w-[50px] border-gray-800 border-4'}>
            <img className={'h-[42px] aspect-square'} src={logo} alt={'logo'} />
          </div>
          <span className={'pl-4 text-3xl dark:text-white'}>Talpakers</span>
        </Link>
      }
    />

    <PredictionPopup />
  </div>
);
HeaderComponent.displayName = 'Header';
export default HeaderComponent;
