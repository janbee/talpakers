import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import MoneyUtil from './MoneyUtil.ts';

describe('MoneyUtil;', () => {
  test('it should mount', () => {
    const result = MoneyUtil(10);
    console.log('gaga-------------------------------------', result);
    expect(result).toEqual('$10.00');
  });
});
