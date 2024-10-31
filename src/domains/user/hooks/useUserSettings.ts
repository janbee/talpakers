import * as React from 'react';
import { useCallback, useState } from 'react';
import { API, UserDetailModel } from '@api/index';
import { mergeMap } from 'rxjs';
import { set } from 'lodash';

const useUseUserSettings = () => {
  const [active, setActive] = useState(false);
  const [formFieldState, setFormFieldState] = useState(new Map<string, unknown>());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpen = useCallback(() => {
    setActive(true);
  }, []);

  const handleCLose = useCallback(() => {
    setActive(false);
  }, []);

  const patchValues = useCallback((key: string, val: unknown) => {
    setFormFieldState((prevState) => {
      const newState = new Map([...prevState]);
      if (newState.has(key) && newState.get(key) === val) {
        newState.delete(key);
      } else {
        newState.set(key, val);
      }
      return newState;
    });
  }, []);

  const submit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const email = formData.get('email') as string;
      const pword = formData.get('password') as string;

      formData.delete('password');

      const userDetails: Partial<UserDetailModel> = {
        _id: email,
      };
      for (const [key, val] of formData.entries()) {
        set(userDetails, key, val);
      }
      for (const [key, val] of formFieldState.entries()) {
        set(userDetails, key, val);
      }

      console.log('gaga----------------------------------userDetails---', userDetails);

      setLoading(true);
      setError('');
      API.$RealmDB
        .login(email, pword)
        .pipe(
          mergeMap(() => {
            console.log('gaga---------------------------------userDetails----', userDetails);
            return API.upsertUserData(userDetails as UserDetailModel);
          })
        )
        .subscribe({
          next: (res) => {
            setLoading(false);
            console.log('gaga-------------------------------------', res);
          },
          error: (err: { error: string }) => {
            setLoading(false);
            setError(err.error);
          },
        });
    },
    [formFieldState]
  );

  return {
    modal: {
      active,
      handleOpen,
      handleCLose,
    },

    form: {
      formFieldState,
      patchValues,
      submit,
      loading,
      error,
    },
  };
};

export default useUseUserSettings;
