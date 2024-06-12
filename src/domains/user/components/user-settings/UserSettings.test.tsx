import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserSettings from './UserSettings';

describe('<UserSettings />', () => {
  test('it should mount', () => {
    render(<UserSettings />);

    const UserSettings = screen.getByTestId('UserSettings');

    expect(UserSettings).toBeInTheDocument();
  });
});