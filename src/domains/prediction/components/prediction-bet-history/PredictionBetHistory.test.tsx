import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PredictionBetHistory from './PredictionBetHistory';

describe('<PredictionBetHistory />', () => {
  test('it should mount', () => {
    render(<PredictionBetHistory />);

    const _PredictionBetHistory = screen.getByTestId('PredictionBetHistory');

    expect(_PredictionBetHistory).toBeInTheDocument();
  });
});
