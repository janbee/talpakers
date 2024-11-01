import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import useUserList from '@PlayAbWeb/domains/user/hooks/useUserList';
import { renderHook } from '@testing-library/react';

describe('useUserSettings', () => {
  test('it should mount', () => {
    const { result } = renderHook(useUserList);
    expect(result.current.list.length).toEqual(0);
  });
});
