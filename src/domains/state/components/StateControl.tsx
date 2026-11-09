import { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import { toMoney } from '@PlayAb/shared';
import useAccountState from '../hooks/useAccountState';
import useBuilds from '../hooks/useBuilds';
import BuildSelect from './BuildSelect';

interface StateControlProps {
  build: string;
}

const buttonBase =
  'rounded-full flex items-center justify-center text-white transition-colors disabled:cursor-not-allowed';

const startClasses =
  'bg-green-600 hover:bg-green-500 active:bg-green-700 disabled:bg-neutral-700 disabled:text-neutral-500';

const stopClasses = 'bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500';

const StateControlComponent: FC<StateControlProps> = ({ build }) => {
  const navigate = useNavigate();
  const { builds, loading: buildsLoading, error: buildsError } = useBuilds();

  // Build names are case insensitive, but the API/URL form wins for display.
  const knownBuild = useMemo(
    () => builds.find((item) => item.toUpperCase() === build.trim().toUpperCase()) ?? '',
    [builds, build]
  );

  // The backend stores the canonical spelling (`data->>build`), so queries and
  // pubnub messages must use it too: `bajo` in the URL is not `BAJO` to Supabase.
  const effectiveBuild = knownBuild || build;

  const { hasTarget, lastAction, start, stop, clearLastAction, totals, totalsLoading, user } = useAccountState({
    build: effectiveBuild,
  });

  // Only flag an unknown build when the list actually loaded; a failed or empty
  // lookup must not accuse the URL of being wrong.
  const buildIsUnknown = !buildsLoading && !buildsError && builds.length > 0 && !!build.trim() && !knownBuild;

  // Keep the URL on the canonical spelling so it can be shared/refreshed safely.
  useEffect(() => {
    if (!knownBuild || knownBuild === build) return;
    navigate(`/state/${encodeURIComponent(knownBuild)}`, { replace: true });
  }, [build, knownBuild, navigate]);

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

  const handleSelectBuild = (next: string) => {
    if (!next) return;
    // `replace` keeps the unknown / miss-cased build out of the back history.
    navigate(`/state/${encodeURIComponent(next)}`, { replace: true });
  };

  return (
    <div
      data-testid="StateControl"
      className="h-full w-full bg-neutral-900 text-white flex flex-col items-center justify-center p-6 gap-8"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <BuildSelect
          builds={builds}
          value={knownBuild}
          loading={buildsLoading}
          requestedBuild={build}
          unknown={buildIsUnknown}
          onSelect={handleSelectBuild}
        />
      </div>

      <div
        data-testid="StateControl-Totals"
        className={classNames(
          'w-full max-w-md grid grid-cols-3 gap-4 rounded-lg border border-neutral-700 bg-neutral-800/60 px-6 py-4 text-center',
          { 'opacity-60': (totalsLoading && !user) || buildIsUnknown }
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
        ) : !hasTarget && !buildIsUnknown ? (
          <div className="text-center text-xs text-neutral-500">Waiting for a desktop to report…</div>
        ) : null}
      </div>
    </div>
  );
};

StateControlComponent.displayName = 'StateControl';
export default StateControlComponent;
