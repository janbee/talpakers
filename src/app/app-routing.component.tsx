import React from 'react';
import { useRoutes } from 'react-router-dom';
import { NotFound } from '@app/shared/component/not-found';
import { MainComponent } from '@components/main/main.component';
import { UserDetailsComponent, UsersComponent } from '@app/app-lazy.component';

export const AppRoutingComponent = (): React.ReactElement | null => {
  return useRoutes([
    {
      path: '',
      element: <MainComponent />,
    },
    {
      path: 'users',
      element: <UsersComponent />,
      children: [
        {
          path: ':email',
          element: <UserDetailsComponent />,
        },
      ],
    },
    /*
     * default component
     * */
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
};
