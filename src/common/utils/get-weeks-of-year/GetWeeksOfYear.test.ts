import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import GetWeeksOfYear from './GetWeeksOfYear';

describe('GetWeeksOfYear', () => {
  test('it should mount', () => {
    const result = GetWeeksOfYear(2024);
    expect(result).toBeTruthy();
  });
});
