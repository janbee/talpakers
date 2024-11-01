import { ReactElement, useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Dimmer, Loader } from 'semantic-ui-react';
import { delay } from 'rxjs';
import AppRoutes from '@PlayAbWeb/common/app-routes/AppRoutes';
import { SharedApi } from '@PlayAb/shared';

const App = (): ReactElement | null => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const realmInit$ = SharedApi.mongoService
      .login('admin@talpak.com', '--------')
      .pipe(delay(500))
      .subscribe((res) => {
        setAppReady(true);
      });

    return () => {
      realmInit$.unsubscribe();
    };
  }, []);

  console.log('gaga-------------------------------------render APP', appReady);
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
