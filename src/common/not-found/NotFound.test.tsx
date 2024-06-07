import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  test('it should mount', () => {
    render(<NotFound />);

    const NotFound = screen.getByTestId('NotFound');

    expect(NotFound).toBeInTheDocument();
  });
});