import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import TemplateName from './TemplateName';

describe('TemplateName', () => {
  test('it should load init state', () => {
    const { result } = renderHook(TemplateName);
    expect(result.current.data).toBeTruthy();
  });
});
