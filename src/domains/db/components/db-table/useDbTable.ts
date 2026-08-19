import { useCallback, useEffect, useState } from 'react';
import { EMPTY, expand, reduce, tap } from 'rxjs';
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
  const [cleanupLoading, setCleanupLoading] = useState<Set<string>>(new Set());
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
    if (cleanupLoading.has(table)) return;
    setCleanupLoading((prev) => new Set(prev).add(table));
    setCleanupMessage(null);

    interface CleanupResult {
      success?: boolean;
      deleted_count?: number;
      batches_executed?: number;
      has_more_rows?: boolean;
      vacuum_command?: string;
      error?: string;
    }

    const getResult = (res: {
      data?: CleanupResult | null;
      error?: { message?: string } | null;
    }): CleanupResult => (res?.data ?? (res as unknown as CleanupResult)) as CleanupResult;

    const subscription = SharedApiSupabase.cleanupOldRecords(schema, table)
      .pipe(
        // Keep invoking the edge function until all batches are drained.
        expand((res) => {
          const result = getResult(res);
          if (res?.error || !result?.success || !result?.has_more_rows) {
            return EMPTY;
          }
          return SharedApiSupabase.cleanupOldRecords(schema, table);
        }),
        reduce(
          (acc, res) => {
            const result = getResult(res);
            if (res?.error) {
              acc.failed = true;
              acc.error = res.error.message ?? 'Cleanup failed';
            } else if (result?.success) {
              acc.deleted += result.deleted_count ?? 0;
              acc.batches += result.batches_executed ?? 1;
              acc.vacuumCommand = result.vacuum_command ?? null;
            } else if (result?.error) {
              acc.failed = true;
              acc.error = result.error;
            } else {
              acc.failed = true;
              acc.error = 'Cleanup failed: Unknown error';
            }
            return acc;
          },
          {
            deleted: 0,
            batches: 0,
            failed: false,
            error: '',
            vacuumCommand: null as string | null,
          }
        ),
      )
      .subscribe({
        next: (acc) => {
          if (acc.failed) {
            const isTimeout =
              acc.error.includes('too long') || acc.error.includes('statement timeout');
            setCleanupMessage({
              type: 'error',
              text: isTimeout
                ? `Error: Cleanup timed out — too many rows to delete in one call. Click Cleanup again to continue deleting in batches.`
                : `Error: ${acc.error}`,
            });
          } else {
            const vacuumCmd = acc.vacuumCommand ? ` - Run: ${acc.vacuumCommand}` : '';
            setCleanupMessage({
              type: 'success',
              text: `Cleanup complete! Deleted ${acc.deleted} records in ${acc.batches} batch(es)${vacuumCmd}`,
            });
          }
          setCleanupLoading((prev) => {
            const next = new Set(prev);
            next.delete(table);
            return next;
          });
        },
        error: (err: { message?: string }) => {
          setCleanupMessage({
            type: 'error',
            text: `Error: ${err?.message ?? 'Failed to cleanup records'}`,
          });
          setCleanupLoading((prev) => {
            const next = new Set(prev);
            next.delete(table);
            return next;
          });
        },
      });

    return subscription;
  }, [cleanupLoading]);

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