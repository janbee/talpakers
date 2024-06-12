import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import GetUserStatusUtil from './GetUserStatusUtil.ts';
import { UserDetailModel, UserStatusModel } from '@api/rxjs-client/models/custom.models.ts';

describe('GetUserStatusUtil;', () => {
  test('it should mount', () => {
    const result = GetUserStatusUtil({} as UserDetailModel);
    expect(result).toEqual(UserStatusModel.IsWaiting);
  });
});
