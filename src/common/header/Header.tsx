import { FC } from 'react';
import logo from '@assets/logo.png';


const HeaderComponent: FC = () => (
  <div
    data-testid="Header"
    className={'h-20 bg-black flex items-center p-3 dark:text-white'}>
    <div className={'icon-wrap flex items-center justify-center rounded-full overflow-hidden h-[50px] w-[50px] border-gray-800 border-4'}>
      <img
        className={'h-[42px] aspect-square'}
        src={logo}
        alt={'logo'} />

    </div>
    <span className={'pl-4 text-3xl'}>Talpakers</span>
  </div>
);
HeaderComponent.displayName = 'Header';
export default HeaderComponent;
