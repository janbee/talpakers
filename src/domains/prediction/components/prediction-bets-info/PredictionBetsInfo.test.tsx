import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PredictionBetsInfo from './PredictionBetsInfo';

describe('<PredictionBetsInfo />', () => {
  test('it should mount', () => {
    render(<PredictionBetsInfo />);

    const _PredictionBetsInfo = screen.getByTestId('PredictionBetsInfo');

    expect(_PredictionBetsInfo).toBeInTheDocument();
  });
});
