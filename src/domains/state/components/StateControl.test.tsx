import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StateControl from './StateControl';
import { HashRouter } from 'react-router-dom';

vi.mock('../hooks/useAccountState', () => ({
  default: () => ({
    hasTarget: false,
    lastAction: null,
    start: vi.fn(),
    stop: vi.fn(),
    clearLastAction: vi.fn(),
    totals: {
      totalDeposits: 1234.56,
      totalWithdrawals: 789.01,
      // Cash flow = withdrawals − deposits
      totalEarnings: 789.01 - 1234.56,
      lifetimeWinAndLoss: -200.4,
    },
    totalsLoading: false,
    user: { _id: 'test', data: { build: 'test-build-1' } },
  }),
}));

describe('<StateControl />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('it should mount and render START/STOP buttons', () => {
    render(
      <HashRouter>
        <StateControl build="test-build-1" />
      </HashRouter>
    );
    expect(screen.getByTestId('StateControl')).toBeInTheDocument();
    expect(screen.getByTestId('StateControl-Start')).toBeInTheDocument();
    expect(screen.getByTestId('StateControl-Stop')).toBeInTheDocument();
  });

  test('it should render the total deposit, total withdrawal, and total earnings cards', () => {
    render(
      <HashRouter>
        <StateControl build="test-build-1" />
      </HashRouter>
    );

    expect(screen.getByTestId('StateControl-Totals')).toBeInTheDocument();
    expect(screen.getByTestId('StateControl-TotalDeposits')).toHaveTextContent('$1,235');
    expect(screen.getByTestId('StateControl-TotalWithdrawals')).toHaveTextContent('$789');
    expect(screen.getByTestId('StateControl-TotalEarnings')).toHaveTextContent('-$446');
  });
});
