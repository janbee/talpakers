import { FC } from 'react';
import usePredictionList from '../../hooks/usePredictionList';
import { Dimmer, Icon, Loader } from 'semantic-ui-react';
import dayjs from 'dayjs';
import classNames from 'classnames';

const PredictionListComponent: FC = () => {
  const {
    list,
    reload,
    loading
  } = usePredictionList();
  console.log('gaga-------------------------------------PredictionListComponent render');
  return (<div data-testid="PredictionList" className={'flex flex-col h-full'}>
      <div className={'flex flex-row items-start justify-between h-10   sticky top-0'}>
        <span className={'dark:text-white text-2xl'}>Predictions (#{list.length})</span>
        <Icon circular inverted className={'cursor-pointer !text-xl !mt-[-7px]'} name="refresh" onClick={reload} />
      </div>
      <hr />

      <div className={'overflow-auto flex-1 mt-2'}>
        {list.map((item) => {
          const {
            _id,
            winningPercentage,
            game,
            createdAt,
            team1Name,
            team2Name,
            predictedWinner,
            winningTeam,
            chatGptVersion,
            status
          } = item;

          return (<div
              key={_id + team1Name + team2Name}

              className={classNames({
                'bg-neutral-950 rounded-lg mt-3 p-3 dark:text-white border': true,
                'border-red-dark': status === 'Lost',
                'border-green-dark': status === 'Won',
                'border-transparent': !status,
              })}>
              <div className={'flex justify-between'}>
                <span>Game</span>
                <span>{game}</span>
              </div>
              <div className={'flex justify-between'}>
                <span>Team</span>
                <span>
                  {team1Name} @ {team2Name}
                </span>
              </div>
              <div className={'flex justify-between'}>
                <span>Predicted Winner</span>
                <span>
                  {predictedWinner} ({winningTeam} team {winningPercentage.toString().replace('%', '')}%)
                </span>
              </div>

              <div className={'flex justify-between'}>
                <span>ChatGpt Version</span>
                <span>{chatGptVersion}</span>
              </div>

              <div className={'flex justify-between'}>
                <span>Date</span>
                <span>
                  {dayjs(createdAt || new Date())
                    .utc()
                    .fromNow()}
                </span>
              </div>
            </div>);
        })}
      </div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>);
};
PredictionListComponent.displayName = 'PredictionList';
export default PredictionListComponent;
