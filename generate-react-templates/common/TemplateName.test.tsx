import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TemplateName from './TemplateName';

describe('<TemplateName />', () => {
  test('it should mount', () => {
    render(<TemplateName />);

    const _TemplateName = screen.getByTestId('TemplateName');

    expect(_TemplateName).toBeInTheDocument();
  });
});
