import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import useUserBetDetails from './useUserBetDetails';

describe('useUserBetDetails', () => {
  test('it should load init state', () => {
    const { result } = renderHook(useUserBetDetails);
    expect(result.current.listStatus).toBeTruthy();
  });
});
