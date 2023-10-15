import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { Store } from "@services/store.service";
import { AlertTypeModel } from "@models/custom.models";
import { useCallback$ } from "@utilities/utils";
import { delay, filter, of, switchMap } from "rxjs";

interface Props {
  content?: string;
}

class State {
  loading = false;
  content? = "";

  constructor(props: Props) {
    this.content = props.content;
  }
}

export const LoaderComponent = (props: Props) => {
  const [state, setState] = useState<State>(new State(props));

  const handleUnload = useCallback$((obs$) => {
    return obs$
      .pipe(
        switchMap(() => {
          return of(true).pipe(delay(2300));
        }),
      )
      .subscribe((connection) => {
        setState((prevState) => ({ ...prevState, loading: false }));
        Store.Loading$.next(false);
      });
  });

  useEffect(() => {
    /*
     * this will remove loader on api ERROR
     * */
    const alert = Store.Alert$.pipe(
      filter((res) => res.type === AlertTypeModel.Failed),
    ).subscribe((res) => {
      handleUnload();
    });

    const loading = Store.Loading$.subscribe((isLoading) => {
      if (isLoading) {
        setState((prevState) => ({ ...prevState, loading: true }));
        handleUnload();
      } else {
        handleUnload();
      }
    });

    return () => {
      alert.unsubscribe();
      loading.unsubscribe();
    };
  }, [handleUnload]);

  return (
    <Dimmer
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      {...(state.loading ? { active: true } : {})}
    >
      <Loader />
    </Dimmer>
  );
};
