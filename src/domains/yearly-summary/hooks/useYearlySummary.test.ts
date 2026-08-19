import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import {
  EXTERNAL_50_ACCOUNT_NAMES,
  FIXED_AMOUNT_FILTER,
  MONTH_LABELS,
  OWNED_ACCOUNT_NAMES,
  extractGhAccounts,
  getExternal100AccountNames,
  getFilteredAccounts,
  getOutsideAccounts,
} from './useYearlySummary';

describe('useYearlySummary helpers', () => {
  test('MONTH_LABELS contains Jan through Dec in order', () => {
    expect(MONTH_LABELS).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  });

  test('EXTERNAL_50_ACCOUNT_NAMES contains KIM', () => {
    expect(Array.from(EXTERNAL_50_ACCOUNT_NAMES)).toEqual(['KIM']);
  });

  test('getExternal100AccountNames derives $100 accounts from fixedAmount 200 minus owned and $50 accounts', () => {
    const fixture = {
      LANNIE: ['l@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      MAKSE: ['m@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      KIM: ['k@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      ANNIE: ['a@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
    };

    const result = getExternal100AccountNames(fixture);

    expect(Array.from(result).sort()).toEqual(['LANNIE']);
  });

  test('FIXED_AMOUNT_FILTER is 200', () => {
    expect(FIXED_AMOUNT_FILTER).toBe(200);
  });

  test('current year helper returns a 4-digit year', () => {
    expect(dayjs().year()).toBeGreaterThan(2000);
  });

  test('extractGhAccounts pulls the accounts object out of the GH bundle string', () => {
    const bundle = `stuff JSON.parse('{"JERO":["j@x.com","pw",null,"uid"],"ANNIE":["a@x.com","pw",{"fixedAmount":200},"uid"]}') more stuff`;

    const result = extractGhAccounts(bundle);

    expect(result?.['JERO']?.[0]).toBe('j@x.com');
    expect(result?.['ANNIE']?.[2]).toEqual({ fixedAmount: 200 });
  });

  test('extractGhAccounts returns null for garbage or missing bundles', () => {
    expect(extractGhAccounts('no json here')).toBeNull();
    expect(extractGhAccounts(undefined)).toBeNull();
  });

  test('getFilteredAccounts keeps only entries in the curated account lists', () => {
    const fixture = {
      LANNIE: ['l@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      MAKSE: ['m@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      CARL: ['c@x.com', 'pw', null, 'uid', []],
    };

    const result = getFilteredAccounts(fixture);

    expect(result).toHaveLength(2);
    expect(result.map((r) => r.name).sort()).toEqual(['LANNIE', 'MAKSE']);
    expect(result[0].emails).toContain('l@x.com');
  });

  test('getFilteredAccounts prefers cashoutEmail when present', () => {
    const fixture = {
      MAKSE: [
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
      MERS: ['login@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
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
      LANNIE: ['l@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      KIM: ['k@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
    };

    const result = getFilteredAccounts(fixture);

    const makse = result.find((r) => r.name === 'MAKSE');
    const lannie = result.find((r) => r.name === 'LANNIE');
    const kim = result.find((r) => r.name === 'KIM');

    expect(makse?.ownership).toBe('owned');
    expect(lannie?.ownership).toBe('external');
    expect(kim?.ownership).toBe('external50');
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
    // MAKSE (owned) and LANNIE (fixedAmount 200 → external 100) are in the summary.
    // JERO (no fixedAmount) and ANNIE (fixedAmount 100) are outside.
    const fixture = {
      MAKSE: ['m@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      LANNIE: ['l@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
      JERO: ['j@x.com', 'pw', null, 'uid', []],
      ANNIE: ['a@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      LEIZYL: ['z@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
    };

    const result = getOutsideAccounts(fixture);
    const names = result.map((r) => r.name).sort();
    expect(names).toEqual(['ANNIE', 'JERO']);
  });

  test('getOutsideAccounts returns an empty array when every entry is in the summary', () => {
    const fixture = {
      MAKSE: ['m@x.com', 'pw', { fixedAmount: 100 } as { fixedAmount?: number }, 'uid', []],
      LANNIE: ['l@x.com', 'pw', { fixedAmount: 200 } as { fixedAmount?: number }, 'uid', []],
    };

    expect(getOutsideAccounts(fixture)).toEqual([]);
  });
});