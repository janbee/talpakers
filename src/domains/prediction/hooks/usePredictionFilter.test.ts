import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePredictionFilter from './usePredictionFilter';

describe('usePredictionFilter', () => {
  test('it should load init state', () => {
    const { result } = renderHook(usePredictionFilter);
    expect(result.current.data).toBeTruthy();
  });
});
