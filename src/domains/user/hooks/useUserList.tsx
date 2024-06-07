import { useEffect, useState } from 'react';
import { UserDetailModel } from '@api/index.ts';
import { Observable, of, tap } from 'rxjs';

const useUseUserList = () => {
  const [list, setList] = useState<UserDetailModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    const gaga = (): Observable<UserDetailModel[]>  => {
      return of([] as UserDetailModel[])
    }

    const user$ = API.pipe(
      tap(() => setLoading(false))
    ).subscribe({
      next: (list) => setList(list),
      error: () => setError(true),
    });


    return () => {
      user$.unsubscribe();
    };
  }, []);

  return { list, loading, error };
};

export default useUseUserList;
