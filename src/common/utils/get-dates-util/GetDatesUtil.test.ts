import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetDatesUtils from './GetDatesUtils';

describe('<GetDatesUtils />', () => {
  test('it should mount', () => {
    render(<GetDatesUtils />);

    const GetDatesUtils = screen.getByTestId('GetDatesUtils');

    expect(GetDatesUtils).toBeInTheDocument();
  });
});