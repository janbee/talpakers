import { describe, expect, test, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StateControl from './StateControl';
import { HashRouter } from 'react-router-dom';

const buildsMock = vi.hoisted(() => ({
  builds: ['LISA', 'ROMMI'] as string[],
  loading: false,
  error: false,
}));

const accountStateMock = vi.hoisted(() => ({
  /** Build values the account state hook was invoked with. */
  requestedBuilds: [] as string[],
}));

vi.mock('../hooks/useBuilds', () => ({
  default: () => buildsMock,
}));

vi.mock('../hooks/useAccountState', () => ({
  default: (params: { build: string }) => {
    accountStateMock.requestedBuilds.push(params.build);
    return {
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
    };
  },
}));

describe('<StateControl />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    buildsMock.builds = ['LISA', 'ROMMI'];
    buildsMock.loading = false;
    buildsMock.error = false;
    accountStateMock.requestedBuilds = [];
    window.location.hash = '';
  });

  test('it should mount and render START/STOP buttons', () => {
    render(
      <HashRouter>
        <StateControl build="LISA" />
      </HashRouter>
    );
    expect(screen.getByTestId('StateControl')).toBeInTheDocument();
    expect(screen.getByTestId('StateControl-Start')).toBeInTheDocument();
    expect(screen.getByTestId('StateControl-Stop')).toBeInTheDocument();
  });

  test('it should render the total deposit, total withdrawal, and total earnings cards', () => {
    render(
      <HashRouter>
        <StateControl build="LISA" />
      </HashRouter>
    );

    expect(screen.getByTestId('StateControl-Totals')).toBeInTheDocument();
    expect(screen.getByTestId('StateControl-TotalDeposits')).toHaveTextContent('$1,235');
    expect(screen.getByTestId('StateControl-TotalWithdrawals')).toHaveTextContent('$789');
    expect(screen.getByTestId('StateControl-TotalEarnings')).toHaveTextContent('-$446');
  });

  test('it should preselect the build from the URL in the dropdown', () => {
    render(
      <HashRouter>
        <StateControl build="LISA" />
      </HashRouter>
    );

    const select = screen.getByTestId('StateControl-BuildSelect') as HTMLSelectElement;
    expect(select).toHaveValue('LISA');
    expect(select).not.toBeDisabled();
    expect(screen.queryByTestId('StateControl-BuildUnknown')).not.toBeInTheDocument();
  });

  test('it should resolve a lower-cased URL build to the canonical build', async () => {
    render(
      <HashRouter>
        <StateControl build="lisa" />
      </HashRouter>
    );

    expect(screen.getByTestId('StateControl-BuildSelect')).toHaveValue('LISA');
    expect(screen.queryByTestId('StateControl-BuildUnknown')).not.toBeInTheDocument();

    // Querying / publishing with `lisa` would miss the `LISA` rows, so the
    // canonical spelling has to reach the account state hook and the URL.
    expect(accountStateMock.requestedBuilds).toContain('LISA');
    expect(accountStateMock.requestedBuilds).not.toContain('lisa');
    await waitFor(() => expect(window.location.hash).toBe('#/state/LISA'));
  });

  test('it should offer a dropdown when the URL build is not available', () => {
    render(
      <HashRouter>
        <StateControl build="TEST" />
      </HashRouter>
    );

    const select = screen.getByTestId('StateControl-BuildSelect') as HTMLSelectElement;
    expect(select).toHaveValue('');
    expect(screen.getByTestId('StateControl-BuildUnknown')).toHaveTextContent('TEST');
    expect(screen.getByRole('option', { name: 'LISA' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'ROMMI' })).toBeInTheDocument();
    expect(screen.queryByText('Waiting for a desktop to report…')).not.toBeInTheDocument();
  });

  test('it should navigate to the selected build', () => {
    render(
      <HashRouter>
        <StateControl build="TEST" />
      </HashRouter>
    );

    fireEvent.change(screen.getByTestId('StateControl-BuildSelect'), { target: { value: 'ROMMI' } });

    expect(window.location.hash).toBe('#/state/ROMMI');
  });

  test('it should not accuse the URL while builds are loading', () => {
    buildsMock.builds = [];
    buildsMock.loading = true;

    render(
      <HashRouter>
        <StateControl build="TEST" />
      </HashRouter>
    );

    const select = screen.getByTestId('StateControl-BuildSelect') as HTMLSelectElement;
    expect(select).toBeDisabled();
    expect(screen.getByRole('option', { name: 'Loading builds…' })).toBeInTheDocument();
    expect(screen.queryByTestId('StateControl-BuildUnknown')).not.toBeInTheDocument();
  });

  test('it should stay quiet when the build lookup failed', () => {
    buildsMock.builds = [];
    buildsMock.error = true;

    render(
      <HashRouter>
        <StateControl build="TEST" />
      </HashRouter>
    );

    expect(screen.queryByTestId('StateControl-BuildUnknown')).not.toBeInTheDocument();
  });
});
