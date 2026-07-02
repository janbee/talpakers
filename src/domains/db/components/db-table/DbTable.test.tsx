import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DbTable from './DbTable';

describe('<DbTable />', () => {
  test('it should mount', () => {
    render(<DbTable />);

    const _DbTable = screen.getByTestId('DbTable');

    expect(_DbTable).toBeInTheDocument();
  });
});