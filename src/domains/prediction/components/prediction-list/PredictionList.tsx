import { FC } from 'react';
import usePredictionList from '../../hooks/usePredictionList';
import { Dimmer, Icon, Loader } from 'semantic-ui-react';
import dayjs from 'dayjs';
import classNames from 'classnames';

const PredictionListComponent: FC = () => {
  const {
    list,
    reload,
    loading,
    status
  } = usePredictionList();
  console.log('gaga-------------------------------------PredictionListComponent render');
  return (<div data-testid="PredictionList" className={'flex flex-col h-full'}>
    <div className={'flex flex-row items-start justify-between h-10  sticky top-0'}>
      <span className={'dark:text-white text-2xl'}>Predictions (#{list.length})</span>
      <Icon circular inverted className={'cursor-pointer !text-xl !mt-[-7px]'} name="refresh" onClick={reload} />
    </div>
    <hr />
    <div className={'flex justify-between mt-2'}>
      <span className={'text-green-dark'}>W (#{status.wins})</span>
      <span className={'text-purple-dark text-center'}>P (#{status.placed})</span>
      <span className={'text-red-dark'}>L (#{status.losses})</span>
    </div>
    <div className={'overflow-auto flex-1 '}>
      {list.map((item) => {
        const {
          _id,
          winningPercentage,
          game,
          createdAt,
          team1Name,
          team2Name,
          predictedWinner,
          status,
          bet1Rate,
          bet2Rate,
          from
        } = item;

        return (<div
          key={_id + team1Name + team2Name}

          className={classNames({
            'bg-neutral-950 rounded-lg mt-3 p-3 dark:text-white border': true,
            'border-red-dark': status === 'Lost',
            'border-green-dark': status === 'Won',
            'border-purple-dark': status === 'Placed',
            'border-transparent': !status
          })}>
          <div className={'flex justify-between items-center'}>
            <span className={'text-xl font-bold'}>{game}({winningPercentage}%)</span>

            <span>
              {dayjs(createdAt || new Date())
                .utc()
                .fromNow()}
            </span>
          </div>
          <div className={'flex justify-between mb-2 items-center'}>
            <span className={'text-sm font-bold'}>{_id}</span>
            <span className={'text-s'}>{from}</span>
          </div>
          <div className={'flex flex-1 flex-row'}>
            <span
              className={classNames({
                'truncate': true,
                'text-green-dark': team1Name === predictedWinner
              })}>
              {team1Name}
            </span>

            &nbsp;

            <span
              className={classNames({
                'text-green-dark': bet1Rate < bet2Rate,
                'text-red-dark': bet1Rate > bet2Rate
              })}>
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
                'text-red-dark': bet2Rate > bet1Rate
              })}>
              ({bet2Rate})
            </span>

            &nbsp;

            <span
              className={classNames({
                'truncate': true,
                'text-green-dark': team2Name === predictedWinner
              })}>
              {team2Name}
            </span>
          </div>

          <div className={'flex justify-start'}>

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
