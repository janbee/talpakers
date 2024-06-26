import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import useUserList from '@domains/user/hooks/useUserList.ts';
import { renderHook } from '@testing-library/react';

describe('useUserSettings', () => {
  test('it should mount', () => {
    const { result } = renderHook(useUserList);
    expect(result.current.list.length).toEqual(0);
  });
});
