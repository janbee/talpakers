import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useUserSettings from './useUserSettings';

describe('<useUserSettings />', () => {
  test('it should mount', () => {
    render(<useUserSettings />);

    const useUserSettings = screen.getByTestId('useUserSettings');

    expect(useUserSettings).toBeInTheDocument();
  });
});