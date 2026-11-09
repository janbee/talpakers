import { useEffect, useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { SharedApiSupabase } from '@PlayAb/services';

export interface UseBuildsResult {
  /** Distinct, trimmed build names, alphabetically sorted. */
  builds: string[];
  loading: boolean;
  error: boolean;
}

/**
 * Loads every build that currently reports into the dashboard.
 *
 * The build list is derived from the `data.build` field of the user rows, so it
 * always reflects the accounts the desktops are actually running instead of a
 * hard coded list.
 */
export function useBuilds(): UseBuildsResult {
  const [builds, setBuilds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    firstValueFrom(SharedApiSupabase.getUsersWithWeeklySummary())
      .then((res) => {
        if (cancelled) return;

        const unique = new Map<string, string>();
        (res?.data ?? []).forEach((user) => {
          const raw = user?.data?.build;
          if (typeof raw !== 'string') return;

          const name = raw.trim();
          if (!name) return;

          const key = name.toUpperCase();
          if (!unique.has(key)) unique.set(key, name);
        });

        setBuilds([...unique.values()].sort((a, b) => a.localeCompare(b)));
        setError(false);
      })
      .catch(() => {
        if (cancelled) return;
        setBuilds([]);
        setError(true);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { builds, loading, error };
}

export default useBuilds;
