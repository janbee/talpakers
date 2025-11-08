import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import useHeader from './useHeader';

describe('useHeader', () => {
  test('it should load init state', () => {
    const { result } = renderHook(useHeader);
    expect(result.current.data).toBeTruthy();
  });
});
