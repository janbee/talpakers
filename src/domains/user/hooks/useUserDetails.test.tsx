import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useUserDetails from './useUserDetails';

describe('<useUserDetails />', () => {
  test('it should mount', () => {
    render(<useUserDetails />);

    const useUserDetails = screen.getByTestId('useUserDetails');

    expect(useUserDetails).toBeInTheDocument();
  });
});