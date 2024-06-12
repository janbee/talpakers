import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDetails from './UserDetails';
import { BrowserRouter } from 'react-router-dom';

describe('<UserDetails />', () => {
  test('it should mount', () => {
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    const _UserDetails = screen.getByTestId('UserDetails');

    expect(_UserDetails).toBeInTheDocument();
  });
});
