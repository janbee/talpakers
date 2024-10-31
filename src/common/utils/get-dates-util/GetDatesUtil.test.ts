import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import GetDatesUtil from './GetDatesUtil';

describe('GetDatesUtil', () => {
  test('it should mount', () => {
    const result = GetDatesUtil();
    expect(result.isNewWeek).toBeTruthy();
  });
});
