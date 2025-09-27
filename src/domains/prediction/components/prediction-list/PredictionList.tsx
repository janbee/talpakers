import * as React from 'react';
import { FC } from 'react';
import usePredictionList from '../../hooks/usePredictionList';
import { Dimmer, Icon, Loader, Popup } from 'semantic-ui-react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { FromAIModel } from '@PlayAb/shared';
import PredictionBetsInfoComponent from '../prediction-bets-info/PredictionBetsInfo';

const PredictionListComponent: FC = () => {
  const { list, reload, loading, listStatus, gameListByGameId } = usePredictionList();
  console.log('gaga-------------------------------------PredictionListComponent render', loading);
  return (
    <div data-testid="PredictionList" className={'flex flex-1 flex-col overflow-hidden'}>
      <div className={'flex flex-row items-start justify-between h-10'}>
        <span className={'dark:text-white text-2xl'}>Predictions (#{list.length})</span>
        <Icon circular inverted className={'cursor-pointer !text-xl !mt-[-7px]'} name="refresh" onClick={reload} />
      </div>
      <hr />
      <div className={'flex justify-between mt-2'}>
        <span className={'text-green-dark'}>W (#{listStatus.Won || 0})</span>
        <span className={'text-purple-dark text-center'}>P (#{listStatus.Placed || 0})</span>
        <span className={'text-red-dark'}>L (#{listStatus.Lost || 0})</span>
      </div>
      <div className={'flex flex-col overflow-auto flex-1 my-3 gap-y-3'}>
        {list.map((item) => {
          const {
            _id,
            winningPercentage,
            game,
            createdAt,
            updatedAt,
            team1Name,
            team2Name,
            status,
            bet1Rate = 0,
            bet2Rate = 0,
            from,
            prediction,
            usersBetInfo,
            updatedBet1Rate,
            updatedBet2Rate,
          } = item;

          return (
            <div
              key={_id + team1Name + team2Name}
              className={classNames({
                group: true,
                'bg-neutral-950 rounded-lg p-3 dark:text-white border': true,
                'border-red-dark': status === 'Lost',
                'border-green-dark': status === 'Won',
                'border-purple-dark': status === 'Placed',
                'border-transparent': !status,
              })}
            >
              <div className={'flex justify-between items-center'}>
                <span className={'text-xl font-bold'}>
                  {game}({winningPercentage}%)
                </span>
                <Popup
                  position="left center"
                  trigger={<span>{createdAt ? dayjs(createdAt).utc().fromNow(true) : ' N/A'}</span>}
                  flowing
                >
                  <span>Last update: {updatedAt ? dayjs(updatedAt).utc().fromNow() : ' N/A'}</span>
                </Popup>
              </div>
              <div className={'flex justify-between mb-2 items-center h-5'}>
                <span className={'text-sm font-bold'}>{_id}</span>
              </div>
              <div className={'flex flex-1 flex-row'}>
                <span
                  className={classNames({
                    truncate: true,
                    'text-green-dark': team1Name === prediction,
                  })}
                >
                  {team1Name}
                </span>
                &nbsp;
                <span
                  className={classNames({
                    'text-green-dark': bet1Rate < bet2Rate,
                    'text-red-dark': bet1Rate > bet2Rate,
                  })}
                >
                  ({bet1Rate}){updatedBet1Rate && ` - ${updatedBet1Rate}`}
                </span>
              </div>

              <div className={'flex justify-center'}>
                <span>VS</span>
              </div>

              <div className={'flex flex-1 flex-row justify-end'}>
                <span
                  className={classNames({
                    'text-green-dark': bet2Rate < bet1Rate,
                    'text-red-dark': bet2Rate > bet1Rate,
                  })}
                >
                  {updatedBet2Rate && `${updatedBet2Rate} - `}({bet2Rate})
                </span>
                &nbsp;
                <span
                  className={classNames({
                    truncate: true,
                    'text-green-dark': team2Name === prediction,
                  })}
                >
                  {team2Name}
                </span>
              </div>

              {/* AI Models */}
              <div className={'mt-2'}>
                {Object.values(
                  from.reduce(
                    (acc, player) => {
                      if (!acc[player.team]) {
                        acc[player.team] = [];
                      }
                      acc[player.team].push(player);
                      return acc;
                    },
                    {} as { [key: string]: FromAIModel[] }
                  )
                )
                  .sort((a, b) => b.length - a.length)
                  .map((group) => {
                    return group.map((item) => {
                      return (
                        <div
                          key={item.name}
                          className={classNames({
                            'flex justify-between text-sm': true,
                            'text-blue-light': group.length >= 2,
                            'text-yellow-light': group.length < 2,
                          })}
                        >
                          <span>{item.name}</span>
                          <span>{item.percentage}%</span>
                        </div>
                      );
                    });
                  })}
              </div>

              <PredictionBetsInfoComponent usersBetInfo={usersBetInfo} />
            </div>
          );
        })}
      </div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};
PredictionListComponent.displayName = 'PredictionList';
export default PredictionListComponent;
