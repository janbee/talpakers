import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import useUserList from './useUserList';

describe('useUserSettings', () => {
  test('it should mount', () => {
    const { result } = renderHook(useUserList);
    expect(result.current.list.length).toEqual(0);
  });
});
