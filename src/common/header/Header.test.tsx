import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('<Header />', () => {
  test('it should mount', () => {
    render(<Header />);

    const _Header = screen.getByTestId('Header');

    expect(_Header).toBeInTheDocument();
  });
});
