import { useEffect, useState } from 'react';
import { tap } from 'rxjs';
import { UserDetailModel } from '@api/rxjs-client/models/custom.models.ts';
import { API } from '@api/index.ts';


const useUseUserList = () => {

  const [list, setList] = useState<UserDetailModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    const user$ = API.getUsers().pipe(
      tap(() => setLoading(false)),
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
