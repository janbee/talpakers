import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetColorUtil from './GetColorUtil';

describe('<GetColorUtil />', () => {
  test('it should mount', () => {
    render(<GetColorUtil />);

    const GetColorUtil = screen.getByTestId('GetColorUtil');

    expect(GetColorUtil).toBeInTheDocument();
  });
});