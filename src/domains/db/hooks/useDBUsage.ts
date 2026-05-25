import { useState, useEffect, useCallback } from 'react';
import { DBUsageResponse, SharedApiSupabase } from '@SharedLib';

/**
 * Custom hook for fetching and managing database usage information
 * Retrieves storage statistics and per-table breakdown
 *
 * @returns State object containing dbUsage, loading, error, and retry function
 */
const useDBUsage = () => {
  const [dbUsage, setDBUsage] = useState<DBUsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(false);

    const subscription = SharedApiSupabase.getDBUsage().subscribe({
      next: (res: any) => {
        // Extract data from Supabase response
        const dbData = res?.data || res;
        setDBUsage(dbData);
        setLoading(false);
      },
      error: (err) => {
        console.error('Error fetching DB usage:', err);
        setError(true);
        setLoading(false);
      },
    });

    return subscription;
  }, []);

  useEffect(() => {
    const subscription = fetchData();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { dbUsage, loading, error, retry };
};

export default useDBUsage;
