import React from 'react';
import { useRoutes } from 'react-router-dom';
import { NotFound } from '@app/shared/component/not-found';
import { MainComponent } from '@components/main/main.component';

export const AppRoutingComponent = (): React.ReactElement | null => {
  return useRoutes([
    {
      path: '',
      element: <MainComponent />,
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
