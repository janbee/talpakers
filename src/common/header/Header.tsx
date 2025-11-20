import { FC } from 'react';
import logo from '../../../src/assets/logo.png';
import { Link } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react';
import { version } from '../../../package.json';
import dayjs from 'dayjs';
import { PredictionPopup } from '../../domains/prediction';
import { getMTDates } from '@PlayAb/shared';
import useHeader from './hooks/useHeader';

const HeaderComponent: FC = () => {
  const { other } = useHeader();
  console.log('HeaderComponent-------------------------------------', other);

  return (
    <div data-testid="Header" className={'h-20 bg-black p-3 flex justify-between items-center'}>
      <div className="flex-1">
        <Popup
          size={'mini'}
          position="right center"
          trigger={
            <Link className={'h-full inline-flex flex-row items-center'} to={'/'}>
              <div className={' rounded-full overflow-hidden h-[50px] w-[50px] border-gray-800 border-4'}>
                <img className={'h-[42px] aspect-square'} src={logo} alt={'logo'} />
              </div>
              <span className={'pl-4 text-3xl dark:text-white'}>Talpakers</span>
            </Link>
          }
        >
          <div>
            v{version} build {dayjs(BUILD_DATE).fromNow()}
          </div>
          <div>MT: {getMTDates().formatDate()}</div>
        </Popup>
      </div>

      <div className="flex items-center gap-2">
        <Popup
          size={'mini'}
          position="right center"
          trigger={<Icon circular inverted className={'cursor-pointer !text-xl'} name="database" />}
        >
          {Object.keys(other).map((key) => {
            return <div key={key}>{other?.[key]}</div>;
          })}
        </Popup>

        <PredictionPopup />
      </div>
    </div>
  );
};

HeaderComponent.displayName = 'Header';
export default HeaderComponent;
