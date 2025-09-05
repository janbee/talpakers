import { FC } from 'react';
import usePredictionFilter from '../../hooks/usePredictionFilter';
import classNames from 'classnames';

const PredictionFilterComponent: FC = () => {
  const { selectedDay, handleDayClick, daysOfWeek, listStatus } = usePredictionFilter();
  return (
    <div data-testid="PredictionFilter" className={'flex flex-col gap-2'}>
      <div className={'flex justify-between'}>
        <span className={'text-green-dark text-sm'}>W (#{listStatus.Won || 0})</span>
        <span className={'text-red-dark text-sm'}>L (#{listStatus.Lost || 0})</span>
      </div>
      <div className={'flex justify-between gap-1'}>
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={classNames({
              'p-2 border-amber-50 flex-1': true,
              'bg-amber-50 text-black': selectedDay === day,
            })}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
PredictionFilterComponent.displayName = 'PredictionFilter';
export default PredictionFilterComponent;
