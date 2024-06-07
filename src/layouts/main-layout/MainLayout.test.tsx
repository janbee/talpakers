import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLayout from './MainLayout';

describe('<MainLayout />', () => {
  test('it should mount', () => {
    render(<MainLayout />);

    const MainLayout = screen.getByTestId('MainLayout');

    expect(MainLayout).toBeInTheDocument();
  });
});