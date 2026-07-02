import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { map } from 'rxjs';
import { SharedApiSupabase } from '@PlayAb/services';
import { WithdrawalSupabaseModel, accounts } from '@PlayAb/shared';

export interface MonthlyWithdrawalSummary {
  month: number; // 1-12
  monthLabel: string; // 'Jan', 'Feb', ...
  totalAmount: number;
  count: number;
  perAccount: AccountBucket[];
}

export interface AccountBucket {
  name: string; // account build name, e.g. 'JOJO'
  count: number;
  amount: number;
  ownership: AccountOwnership;
  dates: string[]; // ISO datetime strings for each withdrawal that contributed to this bucket
  inSummary: boolean; // false for "outside" buckets (not in the in-summary set)
}

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Flat amount credited per external withdrawal — represents one cashout step.
export const EXTERNAL_PER_WITHDRAWAL_AMOUNT = 100;

// Cashout step that qualifies an external account to be included in this summary.
export const FIXED_AMOUNT_FILTER = 200;

// Pick the contribution amount for a withdrawal based on whether it's owned or external.
// Owned: use the actual transaction Amount. External: use the flat per-step amount.
const contributionFor = (withdrawal: WithdrawalSupabaseModel, ownership: AccountOwnership): number => {
  if (ownership === 'owned') {
    return Math.abs(withdrawal.data?.Amount ?? 0);
  }
  return EXTERNAL_PER_WITHDRAWAL_AMOUNT;
};

// Names (as they appear in accounts.json) that you own. Everything else with fixedAmount === 200 is "external".
export const OWNED_ACCOUNT_NAMES: ReadonlySet<string> = new Set([
  'MERS',
  'MAKSE',
  'CABDI',
  'MERCI',
  'NNAS',
  'AMOS',
]);

const ACTIVE_STATUSES = ['Approved'];

type AccountsRecord = Record<string, [string, string, { cashoutEmail?: string; maintainCash?: number; fixedAmount?: number } | null, ...unknown[]]>;

export type AccountOwnership = 'owned' | 'external';

export interface AccountEntrySummary {
  name: string;
  emails: string[];
  fixedAmount?: number;
  ownership: AccountOwnership;
}

const normalizeEmail = (email?: string | null): string | null => {
  if (!email) return null;
  const trimmed = email.trim().replace(/,+$/, ''); // strip trailing commas seen in some entries (e.g. MARY)
  return trimmed.length ? trimmed : null;
};

const getFixedAmount = (settings: { fixedAmount?: number } | null | undefined): number | undefined =>
  settings?.fixedAmount;

const collectEmailsForEntry = (entry: [string, string, { cashoutEmail?: string } | null, ...unknown[]]): string[] => {
  // Prefer cashoutEmail (the payout destination) so the label reflects where withdrawals land.
  // Fall back to the login email if cashoutEmail is missing.
  const cashoutEmail = normalizeEmail(entry[2]?.cashoutEmail);
  const loginEmail = normalizeEmail(entry[0]);
  const primary = cashoutEmail ?? loginEmail;
  return primary ? [primary] : [];
};

export const getFilteredAccounts = (records: AccountsRecord = accounts as unknown as AccountsRecord): AccountEntrySummary[] => {
  return Object.entries(records)
    .map<AccountEntrySummary | null>(([name, entry]) => {
      const fixedAmount = getFixedAmount(entry[2]);
      const isOwned = OWNED_ACCOUNT_NAMES.has(name);
      // Keep the entry if it's an owned account (any fixedAmount) OR has the qualifying fixedAmount.
      if (!isOwned && fixedAmount !== FIXED_AMOUNT_FILTER) return null;
      const emails = collectEmailsForEntry(entry as [string, string, { cashoutEmail?: string } | null, ...unknown[]]);
      const ownership: AccountOwnership = isOwned ? 'owned' : 'external';
      return { name, emails, fixedAmount, ownership };
    })
    .filter((entry): entry is AccountEntrySummary => entry !== null);
};

// Accounts in accounts.json that are NOT in the summary (not owned and fixedAmount !== 200).
// Surfaced as "Outside" so the user can see what they could add by editing accounts.json.
export const getOutsideAccounts = (records: AccountsRecord = accounts as unknown as AccountsRecord): AccountEntrySummary[] => {
  return Object.entries(records)
    .map<AccountEntrySummary | null>(([name, entry]) => {
      const fixedAmount = getFixedAmount(entry[2]);
      const isOwned = OWNED_ACCOUNT_NAMES.has(name);
      // Include only entries that didn't pass the filter above.
      if (isOwned || fixedAmount === FIXED_AMOUNT_FILTER) return null;
      const emails = collectEmailsForEntry(entry as [string, string, { cashoutEmail?: string } | null, ...unknown[]]);
      return { name, emails, fixedAmount, ownership: 'external' as AccountOwnership };
    })
    .filter((entry): entry is AccountEntrySummary => entry !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
};

const buildEmptyMonths = (): MonthlyWithdrawalSummary[] =>
  MONTH_LABELS.map((label, idx) => ({
    month: idx + 1,
    monthLabel: label,
    totalAmount: 0,
    count: 0,
    perAccount: [],
  }));

const buildEmailToBuildMap = (entries: AccountEntrySummary[]): Map<string, string> => {
  const map = new Map<string, string>();
  entries.forEach((entry) => {
    entry.emails.forEach((email) => {
      map.set(email.toLowerCase(), entry.name);
    });
  });
  return map;
};

const sumWithdrawalsByMonth = (
  withdrawals: WithdrawalSupabaseModel[],
  year: number,
  filteredEntries: AccountEntrySummary[],
  emailToBuild: Map<string, string>,
  inSummary: boolean = true
): MonthlyWithdrawalSummary[] => {
  const months = buildEmptyMonths();
  const ownershipByName = new Map<string, AccountOwnership>();
  filteredEntries.forEach((entry) => ownershipByName.set(entry.name, entry.ownership));

  // Safety dedup: skip rows with the same _id (handles re-upserts where the same
  // Approved withdrawal ends up with multiple rows). With Approved-only filtering,
  // each legitimate withdrawal has a unique _id (TransactionID).
  const seenIds = new Set<string>();

  withdrawals.forEach((item) => {
    const { data } = item;
    if (!data?.TransactionDateTime) return;
    if (!ACTIVE_STATUSES.includes(data.TransactionStatus)) return;
    if (item._id && seenIds.has(item._id)) return;
    if (item._id) seenIds.add(item._id);

    const txDate = dayjs(data.TransactionDateTime);
    if (txDate.year() !== year) return;

    const monthIdx = txDate.month(); // 0-11
    const month = months[monthIdx];

    // Resolve the account build: prefer data->>build; fall back to email → build lookup.
    const rawBuild = data.build;
    const email = (data.email ?? '').toLowerCase();
    const resolved = (rawBuild && ownershipByName.has(rawBuild) ? rawBuild : emailToBuild.get(email)) ?? null;

    if (!resolved) return;

    const ownership = ownershipByName.get(resolved) ?? 'external';
    const contribution = contributionFor(item, ownership);

    month.count += 1;
    month.totalAmount += contribution;

    const existingBucket = month.perAccount.find((b) => b.name === resolved);
    if (existingBucket) {
      existingBucket.count += 1;
      existingBucket.amount += contribution;
      existingBucket.dates.push(data.TransactionDateTime);
    } else {
      month.perAccount.push({
        name: resolved,
        count: 1,
        amount: contribution,
        ownership,
        dates: [data.TransactionDateTime],
        inSummary,
      });
    }
  });

  // Sort accounts within each month by amount desc, then name asc.
  months.forEach((m) => {
    m.perAccount.sort((a, b) => b.amount - a.amount || a.name.localeCompare(b.name));
  });

  return months;
};

export const useYearlySummary = () => {
  const [withdrawals, setWithdrawals] = useState<WithdrawalSupabaseModel[]>([]);
  const [outsideWithdrawals, setOutsideWithdrawals] = useState<WithdrawalSupabaseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [year] = useState<number>(() => dayjs().year());

  const filteredAccounts = useMemo(() => getFilteredAccounts(), []);
  const outsideAccountList = useMemo(() => getOutsideAccounts(), []);
  const allBuilds = useMemo(
    () => Array.from(new Set(filteredAccounts.map((entry) => entry.name))),
    [filteredAccounts]
  );
  const outsideBuilds = useMemo(
    () => Array.from(new Set(outsideAccountList.map((entry) => entry.name))),
    [outsideAccountList]
  );

  const fetch = useCallback(() => {
    if (!allBuilds.length && !outsideBuilds.length) {
      setWithdrawals([]);
      setOutsideWithdrawals([]);
      setLoading(false);
      setError(false);
      return undefined;
    }

    setLoading(true);
    setError(false);

    const subs: Array<{ unsubscribe: () => void }> = [];

    if (allBuilds.length) {
      subs.push(
        SharedApiSupabase.getWithdrawals(undefined, allBuilds)
          .pipe(map((res) => res.data ?? []))
          .subscribe({
            next: (data) => {
              setWithdrawals(data);
              setLoading(false);
            },
            error: () => {
              setError(true);
              setLoading(false);
            },
          }),
      );
    }

    if (outsideBuilds.length) {
      subs.push(
        SharedApiSupabase.getWithdrawals(undefined, outsideBuilds)
          .pipe(map((res) => res.data ?? []))
          .subscribe({
            next: (data) => {
              setOutsideWithdrawals(data);
            },
            error: () => {
              // Don't flag the page as errored for the outside query — the in-summary
              // query is the source of truth. Just log and continue.
              // eslint-disable-next-line no-console
              console.warn('Failed to load outside withdrawals');
            },
          }),
      );
    } else {
      setOutsideWithdrawals([]);
    }

    return {
      unsubscribe: () => subs.forEach((s) => s.unsubscribe()),
    };
  }, [allBuilds, outsideBuilds]);

  useEffect(() => {
    const subscription = fetch();
    return () => subscription?.unsubscribe();
  }, [fetch]);

  const ownedBuildSet = useMemo(
    () => new Set(filteredAccounts.filter((e) => e.ownership === 'owned').map((e) => e.name)),
    [filteredAccounts]
  );
  const ownedEmailSet = useMemo(
    () => new Set(filteredAccounts.filter((e) => e.ownership === 'owned').flatMap((e) => e.emails.map((m) => m.toLowerCase()))),
    [filteredAccounts]
  );
  const emailToBuildMap = useMemo(() => buildEmailToBuildMap(filteredAccounts), [filteredAccounts]);

  const ownedAccounts = filteredAccounts.filter((e) => e.ownership === 'owned');
  const externalAccounts = filteredAccounts.filter((e) => e.ownership === 'external');
  const outsideAccounts = outsideAccountList;

  const isOwnedWithdrawal = (w: WithdrawalSupabaseModel): boolean => {
    const build = w.data?.build;
    if (build && ownedBuildSet.has(build)) return true;
    const email = (w.data?.email ?? '').toLowerCase();
    if (email && ownedEmailSet.has(email)) return true;
    return false;
  };

  const monthlySummary: MonthlyWithdrawalSummary[] = sumWithdrawalsByMonth(
    withdrawals,
    year,
    filteredAccounts,
    emailToBuildMap
  );
  const ownedMonthlySummary: MonthlyWithdrawalSummary[] = sumWithdrawalsByMonth(
    withdrawals.filter(isOwnedWithdrawal),
    year,
    filteredAccounts,
    emailToBuildMap
  );
  const externalMonthlySummary: MonthlyWithdrawalSummary[] = sumWithdrawalsByMonth(
    withdrawals.filter((w) => !isOwnedWithdrawal(w)),
    year,
    filteredAccounts,
    emailToBuildMap
  );

  // Build a separate email → build map for outside accounts so their withdrawals resolve correctly.
  const outsideEmailToBuildMap = useMemo(
    () => buildEmailToBuildMap(outsideAccountList),
    [outsideAccountList]
  );
  const outsideMonthlySummary: MonthlyWithdrawalSummary[] = sumWithdrawalsByMonth(
    outsideWithdrawals,
    year,
    outsideAccountList,
    outsideEmailToBuildMap,
    false
  );

  const totalYearAmount = monthlySummary.reduce((sum, m) => sum + m.totalAmount, 0);
  const totalYearCount = monthlySummary.reduce((sum, m) => sum + m.count, 0);
  const totalOwnedAmount = ownedMonthlySummary.reduce((sum, m) => sum + m.totalAmount, 0);
  const totalOwnedCount = ownedMonthlySummary.reduce((sum, m) => sum + m.count, 0);

  return {
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
    retry: fetch,
    filteredAccounts,
    ownedAccounts,
    externalAccounts,
    outsideAccounts,
    allBuilds,
    outsideBuilds,
  };
};

export default useYearlySummary;