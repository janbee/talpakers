import { useCallback, useEffect, useState } from 'react';
import { tap } from 'rxjs';
import { DBUsageResponse, DBTableUsage } from '@PlayAb/shared';
import { SharedApiSupabase } from '@SharedLib';

export type CleanupMessageType = 'success' | 'error';
export interface CleanupMessage {
  type: CleanupMessageType;
  text: string;
}

const useDbTable = () => {
  const [dbUsage, setDBUsage] = useState<DBUsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cleanupLoading, setCleanupLoading] = useState<string | null>(null);
  const [cleanupMessage, setCleanupMessage] = useState<CleanupMessage | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(false);

    const subscription = SharedApiSupabase.getDBUsage()
      .pipe(tap(() => setLoading(false)))
      .subscribe({
        next: (res: { data?: DBUsageResponse } | DBUsageResponse) => {
          const dbData = (res as { data?: DBUsageResponse })?.data ?? (res as DBUsageResponse);
          setDBUsage(dbData ?? null);
        },
        error: () => {
          setError(true);
          setLoading(false);
        },
      });

    return subscription;
  }, []);

  useEffect(() => {
    const subscription = fetchData();
    return () => subscription.unsubscribe();
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const executeCleanup = useCallback((schema: string, table: string) => {
    setCleanupLoading(table);
    setCleanupMessage(null);

    const subscription = SharedApiSupabase.cleanupOldRecords(schema, table).subscribe({
      next: (res: { data?: { success?: boolean; deleted_count?: number; batches_executed?: number; has_more_rows?: boolean; vacuum_command?: string; error?: string }; error?: { message?: string } }) => {
        const result = res?.data ?? (res as unknown as { success?: boolean; deleted_count?: number; batches_executed?: number; has_more_rows?: boolean; vacuum_command?: string; error?: string });
        if (res?.error) {
          setCleanupMessage({ type: 'error', text: `Error: ${res.error.message ?? 'Cleanup failed'}` });
        } else if (result?.success) {
          const vacuumCmd = result.vacuum_command ? ` - Run: ${result.vacuum_command}` : '';
          const moreRows = result.has_more_rows
            ? ` (more rows remain — click Cleanup again to continue)`
            : '';
          setCleanupMessage({
            type: 'success',
            text: `Cleanup complete! Deleted ${result.deleted_count ?? 0} records in ${result.batches_executed ?? 1} batch(es)${moreRows}${vacuumCmd}`,
          });
        } else if (result?.error) {
          setCleanupMessage({ type: 'error', text: `Error: ${result.error}` });
        } else {
          setCleanupMessage({ type: 'error', text: 'Cleanup failed: Unknown error' });
        }
        setCleanupLoading(null);
      },
      error: (err: { message?: string; name?: string }) => {
        const isTimeout = err?.message?.includes('too long');
        setCleanupMessage({
          type: 'error',
          text: isTimeout
            ? `Error: Cleanup timed out after 30s — too many rows to delete in one call. Click Cleanup again to continue deleting in batches.`
            : `Error: ${err?.message ?? 'Failed to cleanup records'}`,
        });
        setCleanupLoading(null);
      },
    });

    return subscription;
  }, []);

  const dismissCleanupMessage = useCallback(() => {
    setCleanupMessage(null);
  }, []);

  return {
    dbUsage,
    loading,
    error,
    retry,
    cleanupLoading,
    cleanupMessage,
    executeCleanup,
    dismissCleanupMessage,
  };
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 bytes';
  const k = 1024;
  const sizes = ['bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const groupTablesBySchema = (tables: DBTableUsage[] = []): Record<string, DBTableUsage[]> => {
  const grouped = tables.reduce(
    (acc, table) => {
      const schema = table.schema;
      if (!acc[schema]) {
        acc[schema] = [];
      }
      acc[schema].push(table);
      return acc;
    },
    {} as Record<string, DBTableUsage[]>
  );

  Object.keys(grouped).forEach((schema) => {
    grouped[schema].sort((a, b) => b.total_bytes - a.total_bytes);
  });

  return grouped;
};

export const computeSchemaStats = (
  grouped: Record<string, DBTableUsage[]>
): Record<string, { dataBytes: number; totalBytes: number }> => {
  const stats: Record<string, { dataBytes: number; totalBytes: number }> = {};
  Object.entries(grouped).forEach(([schema, tables]) => {
    stats[schema] = {
      dataBytes: tables.reduce((sum, t) => sum + t.data_bytes, 0),
      totalBytes: tables.reduce((sum, t) => sum + t.total_bytes, 0),
    };
  });
  return stats;
};

export default useDbTable;