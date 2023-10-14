import React, { useCallback, useEffect, useState } from "react";
import { Observable } from "rxjs";

interface Props<T> {
  observable: Observable<T>;
  children: (value?: T) => React.ReactNode;
}

class State<T> {
  reload = false;
  data!: T;
}

export const RxView = <T,>({ observable, children }: Props<T>) => {
  const [state, setState] = useState(new State<T>());

  useEffect(() => {
    const obs = observable.subscribe((res: T) => {
      setState((prevState) => ({
        ...prevState,
        reload: !state.reload,
        data: res,
      }));
    });
    return () => {
      obs.unsubscribe();
    };
  }, []);

  const child = useCallback((data: T) => {
    return children(data);
  }, []);

  return <div>{child(state.data)}</div>;
};
