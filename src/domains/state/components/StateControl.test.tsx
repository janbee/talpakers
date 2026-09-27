import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StateControl from './StateControl';
import { HashRouter } from 'react-router-dom';

describe('<StateControl />', () => {
  test('it should mount and render START/STOP buttons', () => {
    render(
      <HashRouter>
        <StateControl build="test-build-1" />
      </HashRouter>
    );
    expect(screen.getByTestId('StateControl')).toBeInTheDocument();
    expect(screen.getByTestId('StateControl-Start')).toBeInTheDocument();
    expect(screen.getByTestId('StateControl-Stop')).toBeInTheDocument();
  });
});
