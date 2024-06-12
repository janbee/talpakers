import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';

describe('<MainLayout />', () => {
  test('it should mount', () => {
    render(
      <MainLayout>
        <div />
      </MainLayout>
    );

    const mainLayout = screen.getByTestId('MainLayout');

    expect(mainLayout).toBeInTheDocument();
  });
});
