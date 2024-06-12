import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoneyUtils from './MoneyUtils';

describe('<MoneyUtils />', () => {
  test('it should mount', () => {
    render(<MoneyUtils />);

    const MoneyUtils = screen.getByTestId('MoneyUtils');

    expect(MoneyUtils).toBeInTheDocument();
  });
});