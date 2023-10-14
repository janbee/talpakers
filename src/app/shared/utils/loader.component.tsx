import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { Store } from "@services/store.service";
import { AlertTypeModel } from "@models/custom.models";

interface Props {
  loading: boolean;
  content?: string;
}

class State {
  loading = false;
  content? = "";

  constructor(props: Props) {
    this.loading = props.loading;
    this.content = props.content;
  }
}

export const LoaderComponent = (props: Props) => {
  const [state, setState] = useState<State>(new State(props));

  useEffect(() => {
    const obs = Store.Alert$.subscribe((res) => {
      if (res.type === AlertTypeModel.Failed) {
        /*
         * this will remove loader on api ERROR
         * */
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    });

    return () => {
      obs.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: props.loading }));
  }, [props.loading]);

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
