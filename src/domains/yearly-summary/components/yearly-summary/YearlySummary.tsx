import { FC } from 'react';
import classNames from 'classnames';
import { Button, Dimmer, Icon, Label, Loader, Message } from 'semantic-ui-react';
import { toMoney } from '@PlayAb/shared';
import MonthlyCard from './MonthlyCard';
import useYearlySummary, { AccountEntrySummary, MonthlyWithdrawalSummary } from '../../hooks/useYearlySummary';

interface AccountLabelRowProps {
  title: string;
  color: 'blue' | 'green' | 'red' | 'grey' | 'orange' | 'yellow';
  entries: AccountEntrySummary[];
  amounts?: Record<string, number>;
}

// Aggregate each account's total contribution across all months of the year.
const toAccountAmounts = (summaries: MonthlyWithdrawalSummary[]): Record<string, number> => {
  const amounts: Record<string, number> = {};
  summaries.forEach((month) => {
    month.perAccount.forEach((bucket) => {
      amounts[bucket.name] = (amounts[bucket.name] ?? 0) + bucket.amount;
    });
  });
  return amounts;
};

const AccountLabelRow: FC<AccountLabelRowProps> = ({ title, color, entries, amounts }) => {
  if (entries.length === 0) return null;

  return (
    <div className={classNames('mt-2')}>
      <div className={classNames('text-xs uppercase tracking-wide text-neutral-400 mb-1')}>
        {title} ({entries.length})
      </div>
      <div className={classNames('flex flex-row flex-wrap gap-2')}>
        {entries.map((entry) => {
          const amount = amounts?.[entry.name] ?? 0;
          return (
            <Label key={entry.name} color={color} className={classNames('!break-all')}>
              <span className={classNames('font-semibold')}>{entry.name}</span>
              {amount > 0 && (
                <span className={classNames('ml-1 font-normal opacity-80')}>{toMoney(amount)}</span>
              )}
            </Label>
          );
        })}
      </div>
    </div>
  );
};

const YearlySummaryComponent: FC = () => {
  const {
    year,
    monthlySummary,
    ownedMonthlySummary,
    externalMonthlySummary,
    outsideMonthlySummary,
    totalYearAmount,
    totalYearCount,
    totalOwnedAmount,
    totalOwnedCount,
    loading,
    error,
    retry,
    ownedAccounts,
    externalAccounts,
    external50Accounts,
    outsideAccounts,
  } = useYearlySummary();

  const hasAccounts = ownedAccounts.length + externalAccounts.length + external50Accounts.length > 0;
  const ownedAmounts = toAccountAmounts(ownedMonthlySummary);
  const outsideAmounts = toAccountAmounts(outsideMonthlySummary);
  const totalExternalAmount = totalYearAmount - totalOwnedAmount;
  const totalExternalCount = totalYearCount - totalOwnedCount;

  return (
    <div data-testid="YearlySummary" className={classNames('w-full m-4 bg-neutral-800 rounded-lg relative overflow-hidden')}>
      <div className={classNames('flex flex-col p-4 h-full min-w-[370px]')}>
        <div className={classNames('flex flex-row items-start justify-between h-12')}>
          <span className={classNames('dark:text-white text-2xl')}>Yearly Summary — {year}</span>
          <Icon
            circular
            inverted
            className={classNames('cursor-pointer !text-xl !mt-[-3px]')}
            name="refresh"
            onClick={retry}
          />
        </div>

        <AccountLabelRow title="Owned" color="green" entries={ownedAccounts} amounts={ownedAmounts} />
        <AccountLabelRow title="External" color="grey" entries={externalAccounts} />
        <AccountLabelRow title="External 50" color="yellow" entries={external50Accounts} />
        <AccountLabelRow title="Outside" color="orange" entries={outsideAccounts} amounts={outsideAmounts} />

        {!hasAccounts && !loading && !error && (
          <Message info className={classNames('mt-4')}>
            <Message.Header>No accounts configured</Message.Header>
            <p>
              No entries in <code>accounts.json</code> are in the owned or external account lists.
              Add at least one to see withdrawals here.
            </p>
          </Message>
        )}

        {error && (
          <Message negative className={classNames('mt-4')}>
            <Message.Header>Failed to load withdrawals</Message.Header>
            <p>Please try refreshing or check the account emails.</p>
            <Button primary size="small" onClick={retry}>
              Retry
            </Button>
          </Message>
        )}

        {hasAccounts && !error && (
          <>
            <div className={classNames('flex flex-row items-center justify-between mt-4 dark:text-white gap-4')}>
              <div className={classNames('flex flex-col')}>
                <span className={classNames('text-xs uppercase tracking-wide text-neutral-400')}>All</span>
                <span className={classNames('text-xl font-semibold text-red-dark')}>
                  {toMoney(totalYearAmount)} ({totalYearCount})
                </span>
              </div>
              <div className={classNames('flex flex-col')}>
                <span className={classNames('text-xs uppercase tracking-wide text-neutral-400')}>Owned</span>
                <span className={classNames('text-xl font-semibold text-green-dark')}>
                  {toMoney(totalOwnedAmount)} ({totalOwnedCount})
                </span>
              </div>
              <div className={classNames('flex flex-col')}>
                <span className={classNames('text-xs uppercase tracking-wide text-neutral-400')}>External</span>
                <span className={classNames('text-xl font-semibold text-neutral-300')}>
                  {toMoney(totalExternalAmount)} ({totalExternalCount})
                </span>
              </div>
            </div>

            <hr className={classNames('mt-4 mb-2 border-neutral-700')} />

            <div className={classNames('flex-1 min-h-0 overflow-auto mt-2 [scrollbar-gutter:stable]')}>
              <div className={classNames('grid grid-cols-4 gap-4')}>
                {monthlySummary.map((summary) => {
                  const ownedSummary = ownedMonthlySummary.find((o) => o.month === summary.month);
                  const extSummary = externalMonthlySummary.find((o) => o.month === summary.month);
                  const outSummary = outsideMonthlySummary.find((o) => o.month === summary.month);
                  return (
                    <MonthlyCard
                      key={summary.month}
                      summary={summary}
                      hasData={summary.count > 0}
                      ownedSummary={ownedSummary}
                      externalSummary={extSummary}
                      outsideSummary={outSummary}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};

YearlySummaryComponent.displayName = 'YearlySummary';
export default YearlySummaryComponent;
