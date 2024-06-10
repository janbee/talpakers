import { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import useUserDetails from '@domains/user/hooks/useUserDetails.tsx';
import { sumBy } from 'lodash';
import classNames from 'classnames';
import { MoneyUtil } from '@common/utils';

const UserDetailsComponent: FC = () => {
  const { list, loading, error, userDetails, totalWinnings, totalWithdrawals } = useUserDetails();


  console.log('gaga-------------------------------------', list);
  return (
    <div
      data-testid='UserDetails'
      className={'w-full m-4 bg-neutral-800 rounded-lg relative min-w-[500px]'}>
      <div className={'flex flex-col p-4 h-full'}>
        <div className={'h-12'}>
          <span className={'dark:text-white text-2xl'}>Details</span>
        </div>
        <hr />
        <div className={'flex-1 overflow-auto'}>
          {list.map(mon => {
            const totalMonthlyWinnings = sumBy(mon.data, 'winnings');

            return <div
              key={mon.title}
              className='mon-wrap'>
              <div className={'title-wrap flex justify-between items-center dark:text-white'}>
                <span className={'text-lg'}>
                  {mon.title}
                </span>

                <span
                  className={classNames({
                    'text-lg': true,
                    'text-green-dark': totalMonthlyWinnings > 0,
                    'text-red-dark': totalMonthlyWinnings < 0,
                  })}
                >
                  {MoneyUtil(totalMonthlyWinnings)}
                </span>
              </div>
            </div>;
          })}
        </div>
      </div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};
UserDetailsComponent.displayName = 'UserDetails';
export default UserDetailsComponent;
