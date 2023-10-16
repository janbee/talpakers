import {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Observable, Subject, Subscription } from "rxjs";
import { Store } from "@services/store.service";

export const useSubject = <T>(
  func: (objs: Subject<T>) => Observable<T>,
): Subject<T> => {
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

export const useApi = <T>(
  obs$: Observable<T>,
  options?: {
    withLoading: boolean;
  },
): { loading: boolean; data?: T } => {
  const [state, setState] = useState<{ loading: boolean; data?: T }>({
    loading: true,
  });

  useEffect(() => {
    if (options?.withLoading !== false) {
      Store.Loading$.next(true);
    }
    const subs$ = obs$.subscribe((res) => {
      Store.Loading$.next(false);
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

export const useCallbackMemo = <T>(
  func: (args: T) => void,
  deps: DependencyList,
) => {
  const fn = useMemo(() => {
    return (args: T) => () => func(args);
  }, deps);

  return useCallback(fn, [fn]);
};

export const Money = (money: string | number, currency: string = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(parseFloat(money.toString()));
};

const SwitchMap = () => {};
