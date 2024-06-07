import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useUserList from './useUserList';

describe('<useUserList />', () => {
  test('it should mount', () => {
    render(<useUserList />);

    const useUserList = screen.getByTestId('useUserList');

    expect(useUserList).toBeInTheDocument();
  });
});