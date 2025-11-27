import { useState, useEffect, useCallback } from 'react';
import { SharedApiSupabase } from '@PlayAb/services';
import { GDriveFileModel } from '@talpakers/SharedLib';

/**
 * Extract build name from APK filename
 * Pattern: app-[BUILD_NAME]-release.apk or app-[BUILD_NAME].apk
 * Removes "-release" suffix if present
 */
const extractBuildName = (fileName: string): string | null => {
  const match = fileName.match(/^app-([A-Z0-9_-]+)/i);
  if (!match) return null;
  
  let buildName = match[1];
  // Remove "-release" suffix if present
  buildName = buildName.replace(/-release$/i, '');
  
  return buildName;
};

/**
 * Extract version from APK filename
 * Pattern: app-NAME-release.X.X.X.apk or app-NAME.X.X.X.apk
 * Returns version with "v" prefix
 */
const extractVersion = (fileName: string): string | null => {
  // Match version pattern like .0.0.518.apk
  const match = fileName.match(/\.(\d+\.\d+\.\d+)\.apk$/i);
  return match ? `v${match[1]}` : null;
};

/**
 * Custom hook for fetching and managing APK files from Google Drive
 * Filters to only show files matching app-[name] pattern
 *
 * @returns State object containing files, loading, error, and retry function
 */
const useApksTable = () => {
  const [files, setFiles] = useState<GDriveFileModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(false);

    const subscription = SharedApiSupabase.getGDriveList().subscribe({
      next: (res: GDriveFileModel[]) => {
        // Filter files that match app-[name] pattern
        const filteredFiles = res
          .filter((file) => {
            return file.name.toLowerCase().startsWith('app-');
          })
          .sort((a, b) => {
            // Sort by build name alphabetically
            const buildA = extractBuildName(a.name) || a.name;
            const buildB = extractBuildName(b.name) || b.name;
            return buildA.localeCompare(buildB);
          });
        setFiles(filteredFiles);
        setLoading(false);
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

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { files, loading, error, retry };
};

export { extractBuildName, extractVersion };
export default useApksTable;

