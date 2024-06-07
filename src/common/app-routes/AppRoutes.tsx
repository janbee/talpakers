import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { convertPathToTreeView } from './AppRoutesBuilder.ts';
import NotFoundComponent from '../not-found/NotFound.tsx';
import Page from '../../pages/users';


const AppRoutes = (): ReactElement | null => {
  const pagesDir = import.meta.glob('../../pages/**/*', {
    eager: true,
  });

  const pagesKeys = Object.keys(pagesDir);

  const pages = Object.values(pagesDir).map((Component, index) => {
    const p = pagesKeys[index]
      .replace('../../pages/', '')
      .replace('/index.tsx', '')
      .replace('$', ':')

      .replace('index.tsx', '');

    // @ts-expect-error - page component element
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Element = Component.default;

    return {
      path: p,
      element: <Element />,
      index,
    };
  })


  console.log('gaga---------------------------------pages----', pages);
  console.log('gaga-------------------------------------', [
    // @ts-expect-error - generated page router
    ...convertPathToTreeView(pages).children,

    /*
    * custom route here
    * */
    {
      path: 'gaga',
      element: <Page />,

    },
    {
      path: '*',
      element: <NotFoundComponent />,
    },
  ]);


  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return useRoutes([
    // @ts-expect-error - generated page router
    ...convertPathToTreeView(pages).children,
    /*
    * custom route here
    * */
    {
      path: '*',
      element: <NotFoundComponent />,
    },
  ]);


};

const App = (): ReactElement | null => {

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<>Error</>}>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
