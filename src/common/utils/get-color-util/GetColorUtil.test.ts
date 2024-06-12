import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import GetColorUtil from './GetColorUtil.ts';

describe('GetColorUtil', () => {
  test('it should mount', () => {
    const result = GetColorUtil(3);
    expect(result).toEqual('#bcf139');
  });
});
