import { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import useUserDetails from '@domains/user/hooks/useUserDetails.tsx';
import { sumBy } from 'lodash';
import classNames from 'classnames';
import { MoneyUtil } from '@common/utils';
import dayjs from 'dayjs';

const UserDetailsComponent: FC = () => {
  const { list, loading, error, userDetails, totalWinnings, totalWithdrawals } = useUserDetails();


  console.log('gaga-------------------------------------', list);
  return (
    <div
      data-testid='UserDetails'
      className={'w-full m-4 bg-neutral-800 rounded-lg relative min-w-[370px]'}>
      <div className={'flex flex-col p-4 h-full'}>
        <div className={'h-12'}>
          <span className={'dark:text-white text-2xl'}>Details</span>
        </div>
        <hr />
        <div className={'flex-1 overflow-auto'}>
          {list.map(mon => {
            const totalMonthlyWinnings = sumBy(mon.data, 'winnings');

            return (
              <div
                key={mon.title}
                className='mon-wrap'>
                <div className={'title-wrap flex justify-between items-center dark:text-white pt-2 pb-2 mt-4'}>
                  <span>
                    {mon.title}
                  </span>
                  <span
                    className={classNames({
                      'text-md': true,
                      'text-green-dark': totalMonthlyWinnings > 0,
                      'text-red-dark': totalMonthlyWinnings < 0,
                    })}
                  >
                    {MoneyUtil(totalMonthlyWinnings)}
                  </span>
                </div>

                <hr />

                <div className={'week-wrap flex flex-row flex-wrap'}>
                  {mon.data.map(item => {
                    const startDate = dayjs(item.startDate)
                    const endDate = dayjs(item.endDate)

                    return (
                      <div
                        key={item._id}
                        className={'week-item flex flex-col w-[150px] aspect-square bg-neutral-900 rounded-lg mr-4 mb-4 mt-4 p-3 dark:text-white'}>

                        <div className={'week-content flex h-full flex-col'}>
                          <div className={'week-date flex-1'}>
                            <span>{startDate.format('ddd D')} - {endDate.format('ddd D')}</span>
                          </div>
                          <div className={'flex flex-1 justify-between'}><span>Staked</span><span>$380.60</span></div>
                          <div className={'flex flex-1 justify-between'}><span>Earnings</span><span>$4.15</span></div>
                          <div className={'flex flex-1 justify-between'}><span>Bonus</span><span>$50.00</span></div>
                          <div className={'flex flex-1 justify-between'}><span>Winnings</span><span className='winnings'>$54.15</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
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
