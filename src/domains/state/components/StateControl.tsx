import { FC, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import { toMoney } from '@PlayAb/shared';
import useAccountState from '../hooks/useAccountState';

interface StateControlProps {
  build: string;
}

const buttonBase =
  'rounded-full flex items-center justify-center text-white transition-colors disabled:cursor-not-allowed';

const startClasses =
  'bg-green-600 hover:bg-green-500 active:bg-green-700 disabled:bg-neutral-700 disabled:text-neutral-500';

const stopClasses = 'bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500';

const StateControlComponent: FC<StateControlProps> = ({ build }) => {
  const { hasTarget, lastAction, start, stop, clearLastAction, totals, totalsLoading, user } = useAccountState({
    build,
  });

  // Auto-clear the confirmation after 4s
  useEffect(() => {
    if (!lastAction) return;
    const t = setTimeout(clearLastAction, 4000);
    return () => clearTimeout(t);
  }, [lastAction, clearLastAction]);

  const earningsClass = classNames('font-mono', {
    'text-green-light': totals.totalEarnings > 0,
    'text-red-light': totals.totalEarnings < 0,
    'text-white': totals.totalEarnings === 0,
  });

  return (
    <div
      data-testid="StateControl"
      className="h-full w-full bg-neutral-900 text-white flex flex-col items-center justify-center p-6 gap-8"
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-wider text-neutral-500">Account</div>
        <div className="font-mono  break-all" style={{ fontSize: 30 }}>
          {build}
        </div>
      </div>

      <div
        data-testid="StateControl-Totals"
        className={classNames(
          'w-full max-w-md grid grid-cols-3 gap-4 rounded-lg border border-neutral-700 bg-neutral-800/60 px-6 py-4 text-center',
          { 'opacity-60': totalsLoading && !user }
        )}
      >
        <div data-testid="StateControl-TotalDeposits" className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">Deposit</span>
          <span className="font-mono text-lg text-red-light">{toMoney(Math.round(totals.totalDeposits), 0)}</span>
        </div>
        <div data-testid="StateControl-TotalWithdrawals" className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">Withdrawal</span>
          <span className="font-mono text-lg text-green-light">{toMoney(Math.round(totals.totalWithdrawals), 0)}</span>
        </div>
        <div data-testid="StateControl-TotalEarnings" className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">Earnings</span>
          <span className={classNames('font-mono text-lg', earningsClass)}>
            {toMoney(Math.round(totals.totalEarnings), 0)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6  " style={{ marginTop: 20 }}>
        <button
          type="button"
          data-testid="StateControl-Start"
          disabled={!hasTarget}
          onClick={start}
          style={{ backgroundColor: 'green', width: 100, marginRight: 10 }}
          className={`${buttonBase} ${startClasses} aspect-square flex flex-col gap-2`}
        >
          <Icon name="play" style={{ fontSize: 25 }} />
          Start
        </button>

        <button
          type="button"
          data-testid="StateControl-Stop"
          disabled={!hasTarget}
          onClick={stop}
          style={{ backgroundColor: 'red', width: 100, marginLeft: 10 }}
          className={`${buttonBase} ${stopClasses} w-1/2 aspect-square flex flex-col gap-2`}
        >
          <Icon name="stop" style={{ fontSize: 25 }} />
          Stop
        </button>
      </div>

      <div className="w-full max-w-sm h-12 flex items-center justify-center">
        {lastAction ? (
          <div
            data-testid={`StateControl-Confirmation-${lastAction}`}
            className={[
              'rounded-md px-4 py-2 text-center text-sm font-medium',
              lastAction === 'start' ? 'bg-green-700 text-white' : 'bg-red-700 text-white',
            ].join(' ')}
          >
            {lastAction === 'start' ? '✓ Started' : '✓ Stopped'}
          </div>
        ) : !hasTarget ? (
          <div className="text-center text-xs text-neutral-500">Waiting for a desktop to report…</div>
        ) : null}
      </div>
    </div>
  );
};

StateControlComponent.displayName = 'StateControl';
export default StateControlComponent;
