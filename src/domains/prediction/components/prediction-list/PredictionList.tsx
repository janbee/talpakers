import { FC } from 'react';
import usePredictionList from '../../hooks/usePredictionList';
import { Dimmer, Icon, Loader } from 'semantic-ui-react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

const PredictionListComponent: FC = () => {
  const {
    list,
    reload,
    loading,
    listStatus
  } = usePredictionList();
  console.log('gaga-------------------------------------PredictionListComponent render');
  return (<div data-testid="PredictionList" className={'flex flex-col h-full'}>
    <div className={'flex flex-row items-start justify-between h-10  sticky top-0'}>
      <span className={'dark:text-white text-2xl'}>Predictions (#{list.length})</span>
      <Icon circular inverted className={'cursor-pointer !text-xl !mt-[-7px]'} name="refresh" onClick={reload} />
    </div>
    <hr />
    <div className={'flex justify-between mt-2'}>
      <span className={'text-green-dark'}>W (#{listStatus.Won || 0})</span>
      <span className={'text-purple-dark text-center'}>P (#{listStatus.Placed || 0})</span>
      <span className={'text-red-dark'}>L (#{listStatus.Lost || 0})</span>
    </div>
    <div className={'overflow-auto flex-1'}>
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
            'group': true,
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
                .fromNow(true)}
            </span>
          </div>
          <div className={'flex justify-between mb-2 items-center h-5'}>
            <span className={'text-sm font-bold'}>{_id}</span>
            <button className={classNames({
              'text-sm cursor-pointer py-[1px] px-[5px]': true,
              'hidden': true,
              'group-hover:flex':dayjs(new Date()).diff(createdAt, 'minutes') >= 180 && !status
            })}>Ask AI for Result</button>
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

          <div className={'mt-2'}>
            {from.map(item => {
              return (<div key={item.name} className={'flex justify-between text-sm'}>
                <span>{item.name}</span>
                <span>{item.percentage}%</span>
              </div>);
            })}
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
