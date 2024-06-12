import React, { useEffect, useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
  loading: boolean;
  content?: string;
}

class State {
  loading = false;
  content? = '';

  constructor(props: Props) {
    this.loading = props.loading;
    this.content = props.content;
  }
}

export const ElementComponent = (props: Props) => {
  const [state, setState] = useState<State>(new State(props));

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: props.loading }));
  }, [props.loading]);

  return (
    <Dimmer
      style={{
        position: 'absolute',
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
