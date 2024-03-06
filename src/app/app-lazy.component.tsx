import { lazy } from 'react';

export const UsersComponent = lazy(() =>
  import('@components/users/users.component').then((component) => ({
    default: component.UsersComponent,
  }))
);

export const UserDetailsComponent = lazy(() =>
  import('@components/user-details/user-details.component').then((component) => ({
    default: component.UserDetailsComponent,
  }))
);
