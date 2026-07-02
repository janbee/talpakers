import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import {
  EXTERNAL_PER_WITHDRAWAL_AMOUNT,
  FIXED_AMOUNT_FILTER,
  MONTH_LABELS,
  OWNED_ACCOUNT_NAMES,
  getFilteredAccounts,
  getOutsideAccounts,
} from './useYearlySummary';

describe('useYearlySummary helpers', () => {
  test('MONTH_LABELS contains Jan through Dec in order', () => {
    expect(MONTH_LABELS).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  });

  test('EXTERNAL_PER_WITHDRAWAL_AMOUNT is 100', () => {
    expect(EXTERNAL_PER_WITHDRAWAL_AMOUNT).toBe(100);
  });

  test('FIXED_AMOUNT_FILTER is 200', () => {
    expect(FIXED_AMOUNT_FILTER).toBe(200);
  });

  test('current year helper returns a 4-digit year', () => {
    expect(dayjs().year()).toBeGreaterThan(2000);
  });

  test('getFilteredAccounts keeps only entries with fixedAmount === 200', () => {
    const fixture = {
      ALICE: ['a@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      BOB: ['b@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      CARL: ['c@x.com', 'pw', null, 'uid', []],
    };

    const result = getFilteredAccounts(fixture);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('ALICE');
    expect(result[0].emails).toContain('a@x.com');
  });

  test('getFilteredAccounts prefers cashoutEmail when present', () => {
    const fixture = {
      DAVE: [
        'login@x.com',
        'pw',
        { cashoutEmail: 'payout@x.com', fixedAmount: 200 } as { cashoutEmail?: string; fixedAmount?: number },
        'uid',
        [],
      ],
    };

    const result = getFilteredAccounts(fixture);

    expect(result).toHaveLength(1);
    expect(result[0].emails).toEqual(['payout@x.com']);
  });

  test('getFilteredAccounts falls back to login email when cashoutEmail is missing', () => {
    const fixture = {
      ERIN: ['login@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
    };

    const result = getFilteredAccounts(fixture);

    expect(result).toHaveLength(1);
    expect(result[0].emails).toEqual(['login@x.com']);
  });

  test('getFilteredAccounts strips trailing commas from cashoutEmail (handles MARY-style entries)', () => {
    const fixture = {
      MARY: [
        'login@x.com',
        'pw',
        { cashoutEmail: 'payout@x.com,', fixedAmount: 200 } as { cashoutEmail?: string; fixedAmount?: number },
        'uid',
        [],
      ],
    };

    const result = getFilteredAccounts(fixture);

    expect(result[0].emails).toEqual(['payout@x.com']);
  });

  test('OWNED_ACCOUNT_NAMES contains the six owned accounts', () => {
    expect(Array.from(OWNED_ACCOUNT_NAMES).sort()).toEqual(['AMOS', 'CABDI', 'MAKSE', 'MERCI', 'MERS', 'NNAS']);
  });

  test('getFilteredAccounts classifies entries by ownership', () => {
    const fixture = {
      MAKSE: ['m@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      BAJO: ['b@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
    };

    const result = getFilteredAccounts(fixture);

    const makse = result.find((r) => r.name === 'MAKSE');
    const bajo = result.find((r) => r.name === 'BAJO');

    expect(makse?.ownership).toBe('owned');
    expect(bajo?.ownership).toBe('external');
  });

  test('getFilteredAccounts keeps owned accounts even when fixedAmount is not 200', () => {
    // MAKSE has fixedAmount: 100 in accounts.json, MERS has fixedAmount: 100 too.
    // Both should still come through because they're in OWNED_ACCOUNT_NAMES.
    const fixture = {
      MAKSE: ['m@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      MERS: ['r@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      // RANDOM is neither owned nor has fixedAmount: 200 → should be excluded.
      RANDOM: ['x@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
    };

    const result = getFilteredAccounts(fixture);

    const names = result.map((r) => r.name).sort();
    expect(names).toEqual(['MAKSE', 'MERS']);
    expect(result.every((r) => r.ownership === 'owned')).toBe(true);
  });

  test('getOutsideAccounts returns entries that are not in the summary', () => {
    // MAKSE (owned) and LEIZYL (external fixedAmount=200) are in the summary.
    // JERO (fixedAmount=undefined) and ANNIE (fixedAmount=100) are outside.
    const fixture = {
      MAKSE: ['m@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      LEIZYL: ['l@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      JERO: ['j@x.com', 'pw', null, 'uid', []],
      ANNIE: ['a@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
    };

    const result = getOutsideAccounts(fixture);
    const names = result.map((r) => r.name).sort();
    expect(names).toEqual(['ANNIE', 'JERO']);
  });

  test('getOutsideAccounts returns an empty array when every entry is in the summary', () => {
    const fixture = {
      MAKSE: ['m@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      LEIZYL: ['l@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
    };

    expect(getOutsideAccounts(fixture)).toEqual([]);
  });
});