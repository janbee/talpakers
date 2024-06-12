import { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppRoutes from '@common/app-routes/AppRoutes.tsx';
import { Dimmer, Loader } from 'semantic-ui-react';
import { API } from '@api/index.ts';
import { delay } from 'rxjs';

const App = (): ReactElement | null => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const realmInit$ = API.$RealmDB
      .init()
      .pipe(delay(500))
      .subscribe(() => setAppReady(true));
    return () => {
      realmInit$.unsubscribe();
    };
  }, []);

  console.log('gaga-------------------------------------render APP', appReady);
  return (
    <>
      {appReady && (
        <BrowserRouter>
          <ErrorBoundary fallback={<>Error</>}>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      )}

      <Dimmer active={!appReady}>
        <Loader />
      </Dimmer>
    </>
  );
};

export default App;
