import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserSettings from './UserSettings';
import { UserDetailModel } from '@api/index';

const userDetails = [
  {
    _id: 'janbee.angeles@yahoo.com',
    build: 'JANBEE',
    data: {
      userSession: {
        TWO_FACTOR_AUTH: '2bd769c9-cfd5-4502-9319-00c4e89c5cee',
      },
      settings: {
        electronAutoLogin: true,
      },
    },
  } as UserDetailModel,
];
describe('<UserSettings />', () => {
  test('it should mount', () => {
    render(<UserSettings userDetails={userDetails} />);

    const _UserSettings = screen.getByTestId('UserSettings');

    expect(_UserSettings).toBeInTheDocument();
  });
});
