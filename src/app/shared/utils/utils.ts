import {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  switchMap,
  tap,
} from "rxjs";
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

interface UseApiModel<T> {
  loading: boolean;
  data?: T;
  reload?: () => void;
  sub$: BehaviorSubject<boolean>;
}

export const useApi = <T>(
  func: () => Observable<T>,
  options?: {
    withLoading: boolean;
  },
): UseApiModel<T> => {
  const [state, setState] = useState<UseApiModel<T>>({
    loading: true,
    sub$: new BehaviorSubject(true),
    reload: () => {
      state.sub$.next(true);
    },
  });

  useEffect(() => {
    const unsub = state.sub$
      .pipe(
        tap(() => {
          console.log("gaga-------------------------------useApi------");
          if (options?.withLoading !== false) {
            Store.Loading$.next(true);
          }
          setState((prevState) => ({ ...prevState, loading: true }));
        }),
        switchMap(() => {
          return func();
        }),
      )
      .subscribe((res) => {
        Store.Loading$.next(false);
        setState((prevState) => ({ ...prevState, data: res, loading: false }));
      });

    return () => {
      unsub.unsubscribe();
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

export const GetColor = (value: number) => {
  const colorArr = [
    "#adff2f",
    "#b2fa33",
    "#b7f636",
    "#bcf139",
    "#c0ec3b",
    "#c4e73e",
    "#c8e340",
    "#ccde42",
    "#d0d945",
    "#d3d447",
    "#d6cf48",
    "#d9ca4a",
    "#dcc54c",
    "#dfc04d",
    "#e2bb4f",
    "#e4b650",
    "#e7b152",
    "#e9ab53",
    "#eca654",
    "#eea056",
    "#f09b57",
    "#f29558",
    "#f48f59",
    "#f6895a",
    "#f7835b",
    "#f97c5c",
    "#fb755d",
    "#fc6e5d",
    "#fe675e",
    "#ff5f5f",
  ];
  return colorArr[value];
};
