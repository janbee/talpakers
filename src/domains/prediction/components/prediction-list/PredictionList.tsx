import { FC } from 'react';
import usePredictionList from '../../hooks/usePredictionList';
import { Accordion, Dimmer, Icon, Loader } from 'semantic-ui-react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { FromAIModel, toMoney } from '@PlayAb/shared';

const PredictionListComponent: FC = () => {
  const { list, reload, loading, listStatus } = usePredictionList();
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
            team1Name,
            team2Name,
            status,
            bet1Rate = 0,
            bet2Rate = 0,
            from,
            prediction,
            usersBetInfo,
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
                <span>
                  {dayjs(createdAt || new Date())
                    .utc()
                    .fromNow(true)}
                </span>
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
                  ({bet1Rate})
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
                  ({bet2Rate})
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

              {/* Users Bets */}
              {!!usersBetInfo && !!usersBetInfo.length && (
                <div className={'mt-2 text-sm'}>
                  <Accordion
                    panels={[
                      {
                        key: `panel-${0}`,
                        title: (
                          <Accordion.Title className={'flex justify-between !m-0 !p-0'}>
                            <span className={'text-white'}>{usersBetInfo.length}</span>
                            <i className="dropdown icon text-white" />
                          </Accordion.Title>
                        ),
                        content: {
                          content: (
                            <>
                              {usersBetInfo.map((bet) => {
                                return (
                                  <div key={bet.build} className={'flex gap-1 justify-between'}>
                                    <div className={'flex-1'}>{bet.build}</div>
                                    <div className={'flex-1 text-center'}>{toMoney(bet.staked)}</div>
                                    <div className={'flex-1 text-center'}>{bet.odds}</div>
                                    <div className={'flex-[0.7] text-end'}>
                                      {toMoney(bet.staked * bet.odds - bet.staked)}
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ),
                        },
                      },
                    ]}
                  />
                </div>
              )}
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
