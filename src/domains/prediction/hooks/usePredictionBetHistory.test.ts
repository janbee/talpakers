import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePredictionBetHistory from './usePredictionBetHistory';

describe('usePredictionBetHistory', () => {
  test('it should load init state', () => {
    const { result } = renderHook(usePredictionBetHistory);
    expect(result.current.data).toBeTruthy();
  });
});
