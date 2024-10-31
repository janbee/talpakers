import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PredictionPopup from './PredictionPopup';

describe('<PredictionPopup />', () => {
  test('it should mount', () => {
    render(<PredictionPopup />);

    const _PredictionPopup = screen.getByTestId('PredictionPopup');

    expect(_PredictionPopup).toBeInTheDocument();
  });
});
