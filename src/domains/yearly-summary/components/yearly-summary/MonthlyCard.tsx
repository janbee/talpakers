import { FC } from 'react';
import classNames from 'classnames';
import { Popup } from 'semantic-ui-react';
import { toMoney } from '@PlayAb/shared';
import { AccountBucket, MonthlyWithdrawalSummary } from '../../hooks/useYearlySummary';

export interface MonthlyCardProps {
  summary: MonthlyWithdrawalSummary;
  hasData: boolean;
  ownedSummary?: MonthlyWithdrawalSummary;
  externalSummary?: MonthlyWithdrawalSummary;
  outsideSummary?: MonthlyWithdrawalSummary;
}

const AccountRow: FC<{ bucket: AccountBucket }> = ({ bucket }) => {
  const isOwned = bucket.ownership === 'owned';
  const isOutside = !bucket.inSummary;
  return (
    <div
      data-testid={`MonthlyCard-Account-${bucket.name}`}
      className={classNames(
        'flex flex-row items-center justify-between text-xs py-0.5 px-1 rounded',
        isOwned
          ? 'text-green-300'
          : isOutside
            ? 'text-orange-300'
            : 'text-neutral-300'
      )}
    >
      <span className={classNames('font-semibold truncate')}>
        {bucket.name}
        {bucket.count > 1 && (
          <span className={classNames('ml-1 font-normal text-neutral-400')}>({bucket.count}x)</span>
        )}
      </span>
      <span className={classNames('ml-2 whitespace-nowrap')}>{toMoney(bucket.amount)}</span>
    </div>
  );
};

export const MonthlyCard: FC<MonthlyCardProps> = ({ summary, hasData, ownedSummary, externalSummary, outsideSummary }) => {
  const { monthLabel, totalAmount, count, perAccount } = summary;
  const showOwnedSplit = !!ownedSummary && ownedSummary.count > 0;
  const showExternalSplit = !!externalSummary && externalSummary.count > 0;
  const hasOutside = !!outsideSummary && outsideSummary.count > 0;
  const ownedAmount = ownedSummary?.totalAmount ?? 0;
  const ownedCount = ownedSummary?.count ?? 0;
  const externalAmount = externalSummary?.totalAmount ?? 0;
  const externalCount = externalSummary?.count ?? 0;

  return (
    <div
      data-testid={`MonthlyCard-${monthLabel}`}
      className={classNames(
        'month-card flex flex-col w-full min-h-[280px] bg-neutral-900 rounded-lg p-3 dark:text-white',
        {
          'opacity-60': !hasData,
        }
      )}
    >
      <div className={'month-content flex flex-col h-full'}>
        <div className={'month-name flex items-center justify-between'}>
          <span className={'text-2xl font-semibold'}>{monthLabel}</span>
          <Popup
            content={`${count} withdrawal${count === 1 ? '' : 's'} this month`}
            position="top center"
            trigger={
              <span className={classNames('text-xs text-neutral-400')}>
                {count} {count === 1 ? 'withdrawal' : 'withdrawals'}
              </span>
            }
          />
        </div>

        <div className={'flex justify-between items-center mt-1'}>
          <span className={'text-lg text-neutral-400'}>Withdrawals</span>
          <Popup
            disabled={!hasData}
            content={`${count} withdrawal${count === 1 ? '' : 's'} this month`}
            position="top center"
            trigger={
              <span
                className={classNames({
                  'text-green-dark font-semibold text-2xl': hasData,
                  'text-neutral-500': !hasData,
                })}
              >
                {hasData ? toMoney(totalAmount) : toMoney(0)}
              </span>
            }
          />
        </div>

        {showOwnedSplit && (
          <div className={'flex justify-between items-center text-xs text-green-300'}>
            <span>Owned</span>
            <Popup
              content={`${ownedCount} owned withdrawal${ownedCount === 1 ? '' : 's'} this month`}
              position="top center"
              trigger={<span>{toMoney(ownedAmount)}</span>}
            />
          </div>
        )}

        {showExternalSplit && (
          <div className={'flex justify-between items-center text-xs text-neutral-300'}>
            <span>External</span>
            <Popup
              content={`${externalCount} external withdrawal${externalCount === 1 ? '' : 's'} this month`}
              position="top center"
              trigger={<span>{toMoney(externalAmount)}</span>}
            />
          </div>
        )}

        {hasOutside && (
          <div
            data-testid={`MonthlyCard-Outside-${monthLabel}`}
            className={classNames('flex justify-between items-center text-xs text-orange-300')}
          >
            <span>Outside</span>
            <Popup
              content={`${outsideSummary?.count ?? 0} outside withdrawal${(outsideSummary?.count ?? 0) === 1 ? '' : 's'} this month (not added to total)`}
              position="top center"
              trigger={
                <span className={classNames('cursor-pointer')}>{toMoney(outsideSummary?.totalAmount ?? 0)}</span>
              }
            />
          </div>
        )}

        {(() => {
          // Merge in-summary + outside account buckets into a single list. Outside rows are
          // tagged via `inSummary === false` and rendered in orange.
          const outsideBuckets = outsideSummary?.perAccount ?? [];
          const combined = [...perAccount, ...outsideBuckets];
          if (!combined.length) return null;
          // Sort: in-summary first (by amount desc, then name), then outside (by name asc).
          combined.sort((a, b) => {
            if (a.inSummary !== b.inSummary) return a.inSummary ? -1 : 1;
            if (a.inSummary) {
              return b.amount - a.amount || a.name.localeCompare(b.name);
            }
            return a.name.localeCompare(b.name);
          });
          return (
            <>
              <hr className={classNames('my-2 border-neutral-700')} />
              <div
                data-testid={`MonthlyCard-Accounts-${monthLabel}`}
                className={classNames('flex flex-col gap-0.5 max-h-[220px] overflow-y-auto')}
              >
                {combined.map((bucket) => (
                  <AccountRow key={bucket.name} bucket={bucket} />
                ))}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

MonthlyCard.displayName = 'MonthlyCard';
export default MonthlyCard;