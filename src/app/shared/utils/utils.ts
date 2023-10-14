import { useCallback, useEffect, useMemo, useState } from 'react';
import { Observable, Subject, Subscription } from 'rxjs';

export const useSubject = <T>(func: (objs: Subject<T>) => Observable<T>): Subject<T> => {
  const [subject, setSubject] = useState<Subject<T>>(new Subject<T>());
  useEffect(() => {
    const newSub = new Subject<T>();
    const obs = func(newSub);
    obs.subscribe();
    setSubject(newSub);
    return () => {
      if (newSub) newSub.unsubscribe();
    };
  }, []);

  return subject;
};

export const useCallback$ = <T>(func: (obs$: Subject<T>) => Subscription) => {
  const subject$ = useMemo(() => {
    const subject = new Subject<T>();
    func(subject);
    return subject;
  }, []);

  useEffect(() => {
    return () => {
      subject$.unsubscribe();
    };
  }, []);

  return useCallback((data?: T) => subject$.next(data as T), []);
};

export const useApi = <T>(obs$: Observable<T>): { loading: boolean; data?: T } => {
  const [state, setState] = useState<{ loading: boolean; data?: T }>({ loading: true });

  useEffect(() => {
    const subs$ = obs$.subscribe((res) => {
      setState((prevState) => ({ ...prevState, data: res, loading: false }));
    });

    return () => {
      subs$.unsubscribe();
    };
  }, []);

  return state;
};

export const useObservable = <T>(obs$: Observable<T>): T => {
  const [state, setState] = useState<T>(null as unknown as T);

  useEffect(() => {
    const subs$ = obs$.subscribe((res) => {
      if (Object(res) !== res) {
        setState(res);
      } else {
        setState((prevState) => ({ ...prevState, ...res }));
      }
    });

    return () => {
      subs$.unsubscribe();
    };
  }, []);

  return state;
};
