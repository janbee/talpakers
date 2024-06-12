import { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { sumBy } from 'lodash';
import classNames from 'classnames';
import { MoneyUtil } from '@common/utils';
import {
  UserYearlySummary,
  WeeklyCard,
  WithdrawalPopup,
} from '@domains/user/components/user-details/UserDetailsUI.tsx';
import UserSettingsComponent from '@domains/user/components/user-settings/UserSettings.tsx';
import useUserDetails from '@domains/user/hooks/useUserDetails';

const UserDetailsComponent: FC = () => {
  const { list, loading, userDetails, totalWinnings, totalWithdrawals, emails } = useUserDetails();

  return (
    <div data-testid="UserDetails" className={'w-full m-4 bg-neutral-800 rounded-lg relative'}>
      <div className={'flex flex-col p-4 h-full min-w-[370px]'}>
        <div className={'flex flex-row justify-between items-start h-12'}>
          <div className={'flex flex-row'}>
            <span className={'dark:text-white text-2xl'}>{emails.length === 1 ? emails[0] : 'Multi User View'}</span>
            {emails.length === 1 && (
              <UserYearlySummary
                userDetails={userDetails}
                totalWinnings={totalWinnings}
                totalWithdrawals={totalWithdrawals}
              />
            )}
          </div>

          <UserSettingsComponent userDetails={userDetails} />
        </div>
        <hr />
        <div className={'flex-1 overflow-auto mt-4'}>
          {list.map((mon) => {
            const totalMonthlyWinnings = sumBy(mon.data, 'winnings');

            return (
              <div key={mon.title} className="mon-wrap">
                <div className={'title-wrap flex justify-between items-center dark:text-white pt-2 pb-2 '}>
                  <span>{mon.title}</span>
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
                  {mon.data.map((item) => {
                    return (
                      <div key={item._id} className={'relative'}>
                        <WithdrawalPopup earnings={item} />
                        <WeeklyCard earnings={item} />
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
