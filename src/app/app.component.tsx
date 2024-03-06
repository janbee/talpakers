import React, { Suspense } from 'react';
import { AppRoutingComponent } from '@app/app-routing.component';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@app/shared/component/error-fallback';
import useFontFaceObserver from 'use-font-face-observer';
import { useApi } from '@utilities/utils';
import { API } from '@services/api.service';
import { HeaderComponent } from '@components/header/header.component';
import { LoaderComponent } from '@app/shared/component/loader.component';

export const AppComponent = () => {
  const webFontsLoaded = useFontFaceObserver([{ family: `quicksand` }]);
  const [realm] = useApi(() => API.$RealmDB.init());
  return (
    <div className="container">
      <HeaderComponent />
      <div className="content-wrap">
        {webFontsLoaded && !realm.loading && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div>Loading...</div>}>
              <AppRoutingComponent />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
      <LoaderComponent />
    </div>
  );
};
