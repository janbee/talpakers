import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PredictionList from './PredictionList';

describe('<PredictionList />', () => {
  test('it should mount', () => {
    render(<PredictionList />);

    const _PredictionList = screen.getByTestId('PredictionList');

    expect(_PredictionList).toBeInTheDocument();
  });
});
