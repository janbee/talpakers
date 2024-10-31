import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePredictionList from './usePredictionList';

describe('usePredictionList', () => {
  test('it should load init state', () => {
    const { result } = renderHook(usePredictionList);
    expect(result.current.list).toBeTruthy();
  });
});
