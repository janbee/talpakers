import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PredictionFilter from './PredictionFilter';

describe('<PredictionFilter />', () => {
  test('it should mount', () => {
    render(<PredictionFilter />);

    const _PredictionFilter = screen.getByTestId('PredictionFilter');

    expect(_PredictionFilter).toBeInTheDocument();
  });
});
