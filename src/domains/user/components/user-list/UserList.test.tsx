import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserList from './UserList';
import { BrowserRouter } from 'react-router-dom';

describe('<UserList />', () => {
  test('it should mount', () => {
    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>,
    );
    const _UserList = screen.getByTestId('UserList');

    expect(_UserList).toBeInTheDocument();
  });
});
