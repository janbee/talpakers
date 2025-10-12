import { ReactElement, useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Dimmer, Loader } from 'semantic-ui-react';
import { delay, of } from 'rxjs';
import AppRoutes from './common/app-routes/AppRoutes';
import { SharedApiSupabase } from '@PlayAb/services';

const App = (): ReactElement | null => {
  const [appReady, setAppReady] = useState(false);


  useEffect(() => {
    const realmInit$ = SharedApiSupabase.login('talpaklogen@gmail.com')
      .pipe(delay(500))
      .subscribe(() => {
        setAppReady(true);
      });
    return () => {
      realmInit$.unsubscribe();
    };
  }, []);

  return (
    <>
      {appReady && (
        <HashRouter>
          <ErrorBoundary fallback={<>Error</>}>
            <AppRoutes />
          </ErrorBoundary>
        </HashRouter>
      )}

      <Dimmer active={!appReady}>
        <Loader />
      </Dimmer>
    </>
  );
};

export default App;
