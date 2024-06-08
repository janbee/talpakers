import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetUserStatusUtil from './GetUserStatusUtil';

describe('<GetUserStatusUtil />', () => {
  test('it should mount', () => {
    render(<GetUserStatusUtil />);

    const GetUserStatusUtil = screen.getByTestId('GetUserStatusUtil');

    expect(GetUserStatusUtil).toBeInTheDocument();
  });
});