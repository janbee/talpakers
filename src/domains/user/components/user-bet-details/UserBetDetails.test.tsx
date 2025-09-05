import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserBetDetails from './UserBetDetails';

describe('<UserBetDetails />', () => {
  test('it should mount', () => {
    render(<UserBetDetails />);

    const _UserBetDetails = screen.getByTestId('UserBetDetails');

    expect(_UserBetDetails).toBeInTheDocument();
  });
});
