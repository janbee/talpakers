import React from 'react';
import { AppRoutingComponent } from '@app/app-routing.component';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@app/shared/component/error-fallback';
import useFontFaceObserver from 'use-font-face-observer';
import { LoaderComponent } from '@utilities/loader.component';
import { Store } from '@services/store.service';
import { useObservable } from '@utilities/utils';

export const AppComponent = () => {
  const loading = useObservable(Store.Loading$);
  const webFontsLoaded = useFontFaceObserver([{ family: `quicksand` }]);
  console.log('AppComponent -------- ------- ------render');
  return (
    <div className="container">
      <LoaderComponent loading={!webFontsLoaded || loading} />
      {webFontsLoaded && (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRoutingComponent />
        </ErrorBoundary>
      )}
    </div>
  );
};
