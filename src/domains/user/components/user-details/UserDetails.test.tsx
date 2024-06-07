import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDetails from './UserDetails';

describe('<UserDetails />', () => {
  test('it should mount', () => {
    render(<UserDetails />);

    const UserDetails = screen.getByTestId('UserDetails');

    expect(UserDetails).toBeInTheDocument();
  });
});