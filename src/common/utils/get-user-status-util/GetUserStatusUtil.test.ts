import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import GetUserStatusUtil from './GetUserStatusUtil';
import { UserDetailModel, UserStatusModel } from '@PlayAbWeb/api/rxjs-client/models/custom.models';

describe('GetUserStatusUtil;', () => {
  test('it should mount', () => {
    const result = GetUserStatusUtil({} as UserDetailModel);
    expect(result).toEqual(UserStatusModel.IsWaiting);
  });
});
