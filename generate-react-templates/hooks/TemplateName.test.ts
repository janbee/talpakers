import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import templateName from './templateName';

describe('templateName', () => {
  test('it should load init state', () => {
    const { result } = renderHook(templateName);
    expect(result.current.data).toBeTruthy();
  });
});
