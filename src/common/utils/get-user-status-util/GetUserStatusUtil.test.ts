import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import GetUserStatusUtil from './GetUserStatusUtil';
import { UserStatusModel } from '../../../api/rxjs-client/models/custom.models';
import { UserModel } from '@PlayAb/shared';

describe('GetUserStatusUtil;', () => {
  test('it should mount', () => {
    const result = GetUserStatusUtil({} as UserModel);
    expect(result).toEqual(UserStatusModel.IsWaiting);
  });
});
