import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import YearlySummary from './YearlySummary';

describe('<YearlySummary />', () => {
  test('it should mount', () => {
    render(<YearlySummary />);

    const container = screen.getByTestId('YearlySummary');

    expect(container).toBeInTheDocument();
  });

  test('it should show the yearly summary heading with the current year', () => {
    render(<YearlySummary />);

    expect(screen.getByText(/Yearly Summary/i)).toBeInTheDocument();
  });
});