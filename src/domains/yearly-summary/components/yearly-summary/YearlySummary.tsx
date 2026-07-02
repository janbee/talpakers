import { FC } from 'react';
import classNames from 'classnames';
import { Button, Dimmer, Icon, Label, Loader, Message } from 'semantic-ui-react';
import { toMoney } from '@PlayAb/shared';
import MonthlyCard from './MonthlyCard';
import useYearlySummary, { AccountEntrySummary } from '../../hooks/useYearlySummary';

interface AccountLabelRowProps {
  title: string;
  color: 'blue' | 'green' | 'red' | 'grey' | 'orange';
  entries: AccountEntrySummary[];
}

const AccountLabelRow: FC<AccountLabelRowProps> = ({ title, color, entries }) => {
  if (entries.length === 0) return null;

  return (
    <div className={classNames('mt-2')}>
      <div className={classNames('text-xs uppercase tracking-wide text-neutral-400 mb-1')}>
        {title} ({entries.length})
      </div>
      <div className={classNames('flex flex-row flex-wrap gap-2')}>
        {entries.map((entry) => (
          <Label key={entry.name} color={color} className={classNames('!break-all')}>
            <span className={classNames('font-semibold')}>{entry.name}</span>
          </Label>
        ))}
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
    outsideAccounts,
  } = useYearlySummary();

  const hasAccounts = ownedAccounts.length + externalAccounts.length > 0;
  const totalExternalAmount = totalYearAmount - totalOwnedAmount;
  const totalExternalCount = totalYearCount - totalOwnedCount;

  return (
    <div data-testid="YearlySummary" className={classNames('w-full m-4 bg-neutral-800 rounded-lg relative')}>
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

        <div className={classNames('mt-2 text-sm text-neutral-400')}>
          Accounts with <code className={classNames('text-neutral-200')}>fixedAmount === 200</code>
          {hasAccounts && (
            <>
              {' '}· {ownedAccounts.length} owned · {externalAccounts.length} external
              {' '}· external withdrawals counted as <code className={classNames('text-neutral-200')}>$100</code> each
              {' '}· owned withdrawals use the actual amount
            </>
          )}
          {outsideAccounts.length > 0 && (
            <>
              {' '}· {outsideAccounts.length} outside (not in summary)
            </>
          )}
        </div>

        <AccountLabelRow title="Owned" color="green" entries={ownedAccounts} />
        <AccountLabelRow title="External" color="grey" entries={externalAccounts} />
        <AccountLabelRow title="Outside" color="orange" entries={outsideAccounts} />

        {!hasAccounts && !loading && !error && (
          <Message info className={classNames('mt-4')}>
            <Message.Header>No accounts with fixedAmount === 200</Message.Header>
            <p>
              No entries in <code>accounts.json</code> have a <code>fixedAmount</code> of{' '}
              <code>200</code>. Add at least one to see withdrawals here.
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
          <div className={classNames('mt-2')}>
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

            <div className={classNames('flex-1 overflow-auto mt-2')}>
              <div className={classNames('flex flex-row flex-wrap')}>
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
          </div>
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