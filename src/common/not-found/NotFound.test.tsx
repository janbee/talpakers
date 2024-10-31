import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  test('it should mount', () => {
    render(<NotFound />);

    const _NotFound = screen.getByTestId('NotFound');

    expect(_NotFound).toBeInTheDocument();
  });
});
