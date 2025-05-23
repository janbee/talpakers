import { FC } from 'react';
import { toMoney, UserModel } from '@PlayAb/shared';
import useUserBetDetails from '../../hooks/useUserBetDetails';
import { Dimmer, Loader } from 'semantic-ui-react';
import classNames from 'classnames';

interface UserBetDetailsProps {
  user: UserModel;
}

const UserBetDetailsComponent: FC<UserBetDetailsProps> = (props) => {
  const { user } = props;
  const { predictionDictionary, loading, listStatus } = useUserBetDetails(user);

  return (
    <div data-testid="UserBetDetails" className={'flex flex-col h-full p-1 pt-0 gap-y-1'}>
      <div className={'flex justify-between mt-2 text-sm'}>
        <span className={'text-green-light font-bold'}>W (#{listStatus.Won || 0})</span>
        <span className={'text-red-light font-bold'}>L (#{listStatus.Lost || 0})</span>
      </div>
      <div className={'overflow-auto h-full flex flex-1 flex-col gap-y-1'}>
        {!!predictionDictionary &&
          user.data.weeklyStatus?.betSummary.betsInfo?.map((betInfo) => {
            const id = betInfo.gameId;
            const prediction = predictionDictionary[id];
            return (
              <div
                key={id}
                className={ classNames({
                  'flex flex-row gap-x-1 justify-between text-sm border-2 rounded-md p-2': true,
                  'border-green-light': prediction.status === 'Won',
                  'border-red-light': prediction.status === 'Lost',
                  'border-purple-light': prediction.status === 'Placed',
                })}
              >
                <span className={'flex items-center flex-[0.2]'}>{toMoney(betInfo.staked)}</span>
                <div className={'flex flex-1  justify-between items-center gap-x-4'}>
                  <span className={'flex-1'}>{prediction.team1Name}</span>
                  <span>vs</span>
                  <span className={'flex-1 text-right'}>{prediction.team2Name}</span>
                </div>
              </div>
            );
          })}
      </div>

      <Dimmer inverted active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};
UserBetDetailsComponent.displayName = 'UserBetDetails';
export default UserBetDetailsComponent;
