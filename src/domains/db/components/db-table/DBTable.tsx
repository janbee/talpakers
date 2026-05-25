import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Dimmer, Form, Icon, Loader, Message, Segment, Statistic, Table } from 'semantic-ui-react';
import useDBUsage from '../../hooks/useDBUsage';
import { DBTableUsage, SharedApiSupabase } from '@SharedLib';
import { map, mergeMap } from 'rxjs';

/**
 * DBTable component
 * Displays database storage usage overview and per-table breakdown grouped by schema
 */
const DBTable: FC = () => {
  const { dbUsage, loading, error, retry } = useDBUsage();
  const [expandedSchemas, setExpandedSchemas] = useState<Set<string>>(new Set(['TalpakersDB']));
  const [cleanupLoading, setCleanupLoading] = useState<string | null>(null); // Track specific table loading status
  const [cleanupMessage, setCleanupMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const groupedTables = useMemo(() => {
    if (!dbUsage?.tables) return {};

    const grouped = dbUsage.tables.reduce(
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

    // Sort tables within each schema by total_bytes descending
    Object.keys(grouped).forEach((schema) => {
      grouped[schema].sort((a, b) => b.total_bytes - a.total_bytes);
    });

    return grouped;
  }, [dbUsage?.tables]);

  const schemaStats = useMemo(() => {
    const stats: Record<string, { dataBytes: number; totalBytes: number }> = {};

    Object.entries(groupedTables).forEach(([schema, tables]) => {
      stats[schema] = {
        dataBytes: tables.reduce((sum, t) => sum + t.data_bytes, 0),
        totalBytes: tables.reduce((sum, t) => sum + t.total_bytes, 0),
      };
    });

    return stats;
  }, [groupedTables]);

  const toggleSchema = (schema: string) => {
    const newSet = new Set(expandedSchemas);
    if (newSet.has(schema)) {
      newSet.delete(schema);
    } else {
      newSet.add(schema);
    }
    setExpandedSchemas(newSet);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 bytes';
    const k = 1024;
    const sizes = ['bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  useEffect(() => {
    console.log('DBTable data:', { dbUsage, loading, error });
  }, [dbUsage, loading, error]);

  // Direct immediate execution pipeline
  const executeCleanupAction = (schema: string, table: string) => {
    setCleanupLoading(table);
    setCleanupMessage(null);

    SharedApiSupabase.cleanupOldRecords(schema, table)
      .pipe(
        mergeMap((res) => {
          return SharedApiSupabase.vacuum(schema, table).pipe(map(() => res));
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log('Cleanup response:', res);

          // Handle Supabase response structure
          const result = res?.data || res;

          // Check for errors in the response
          if (res?.error) {
            console.error('Supabase error:', res.error);
            setCleanupMessage({
              type: 'error',
              text: `Error: ${res.error.message || 'Cleanup failed'}`,
            });
          } else if (result?.success) {
            const vacuumCmd = result.vacuum_command ? ` - Run: ${result.vacuum_command}` : '';
            setCleanupMessage({
              type: 'success',
              text: `Cleanup complete! Deleted ${result.deleted_count} records${vacuumCmd}`,
            });
          } else if (result?.error) {
            setCleanupMessage({
              type: 'error',
              text: `Error: ${result.error}`,
            });
          } else {
            setCleanupMessage({
              type: 'error',
              text: 'Cleanup failed: Unknown error',
            });
          }
          setCleanupLoading(null);
        },
        error: (err: any) => {
          console.error('Cleanup error:', err);
          setCleanupMessage({
            type: 'error',
            text: `Error: ${err?.message || 'Failed to cleanup records'}`,
          });
          setCleanupLoading(null);
        },
      });
  };

  // Error state
  if (!loading && error) {
    return (
      <div className="w-full m-4 bg-neutral-800 rounded-lg p-4">
        <Message negative>
          <Message.Header>Failed to load database usage</Message.Header>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
          <Button primary size="small" onClick={retry}>
            Retry
          </Button>
        </Message>
      </div>
    );
  }

  // Empty state
  if (!loading && !error && !dbUsage) {
    return (
      <div className="w-full m-4 bg-neutral-800 rounded-lg p-4">
        <Message info>
          <Message.Header>No database usage data available</Message.Header>
          <p>Unable to retrieve database statistics at this time.</p>
        </Message>
      </div>
    );
  }

  // Show loading state while fetching
  if (loading) {
    return (
      <div className="w-full m-4 bg-neutral-800 rounded-lg relative h-96">
        <Dimmer active={true}>
          <Loader />
        </Dimmer>
      </div>
    );
  }

  // Data state
  return (
    <div className="w-full m-4 bg-neutral-800 rounded-lg">
      <div className="flex flex-col p-4 h-full">
        <div className="flex flex-row items-start justify-between h-12">
          <span className="dark:text-white text-2xl">Database Usage</span>
          <Icon circular inverted className="cursor-pointer !text-xl !mt-[-3px]" onClick={retry} name="refresh" />
        </div>

        {/* Overall Usage Stats */}
        {dbUsage?.used && (
          <Segment inverted className="!bg-neutral-900 !border-neutral-700">
            <Statistic.Group widths="two">
              <Statistic inverted>
                <Statistic.Value className="!text-white">{dbUsage.used.used_pretty}</Statistic.Value>
                <Statistic.Label className="!text-neutral-400">Data Used</Statistic.Label>
              </Statistic>
              <Statistic inverted>
                <Statistic.Value className="!text-white">{dbUsage.used.used_gb_pretty}</Statistic.Value>
                <Statistic.Label className="!text-neutral-400">GB Used</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        )}

        {cleanupMessage && (
          <Message
            onDismiss={() => setCleanupMessage(null)}
            negative={cleanupMessage.type === 'error'}
            positive={cleanupMessage.type === 'success'}
            className="mb-4"
          >
            {cleanupMessage.text}
          </Message>
        )}

        <hr />

        {/* Tables Breakdown */}
        <Form className="flex-1 overflow-auto mt-4">
          <Table
            size="small"
            compact
            striped
            celled
            inverted
            unstackable
            aria-label="Database table storage usage breakdown"
          >
            <Table.Header className="bg-neutral-900 sticky top-0 z-10">
              <Table.Row>
                <Table.HeaderCell textAlign="center" width={1}></Table.HeaderCell>
                <Table.HeaderCell textAlign="center">TABLE / SCHEMA</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">DATA SIZE</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">TOTAL SIZE</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">INDEX & TOAST</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width={3}>
                  ACTIONS
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.entries(groupedTables).length > 0 ? (
                Object.entries(groupedTables)
                  .sort(([, tablesA], [, tablesB]) => {
                    const bytesA = tablesA.reduce((sum, t) => sum + t.total_bytes, 0);
                    const bytesB = tablesB.reduce((sum, t) => sum + t.total_bytes, 0);
                    return bytesB - bytesA;
                  })
                  .map(([schema, tables]) => {
                    const isExpanded = expandedSchemas.has(schema);
                    const stats = schemaStats[schema];

                    return (
                      <Fragment key={schema}>
                        <Table.Row
                          className="!bg-neutral-850 hover:!bg-neutral-800 cursor-pointer"
                          onClick={() => toggleSchema(schema)}
                        >
                          <Table.Cell textAlign="center">
                            <Icon name={isExpanded ? 'chevron down' : 'chevron right'} className="!m-0" />
                          </Table.Cell>
                          <Table.Cell className="!font-semibold !text-blue-300">📦 {schema}</Table.Cell>
                          <Table.Cell textAlign="center" className="!text-yellow-300">
                            {formatBytes(stats.dataBytes)}
                          </Table.Cell>
                          <Table.Cell textAlign="center" className="!text-yellow-300">
                            {formatBytes(stats.totalBytes)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">{formatBytes(stats.totalBytes - stats.dataBytes)}</Table.Cell>
                        </Table.Row>

                        {isExpanded &&
                          tables.map((table, index) => (
                            <Table.Row key={`${schema}-${table.table}-${index}`} className="!bg-neutral-900">
                              <Table.Cell></Table.Cell>
                              <Table.Cell className="!pl-8">→ {table.table}</Table.Cell>
                              <Table.Cell textAlign="center">{table.data_pretty}</Table.Cell>
                              <Table.Cell textAlign="center">{table.total_pretty}</Table.Cell>
                              <Table.Cell textAlign="center">{table.index_and_toast_pretty}</Table.Cell>
                              <Table.Cell textAlign="center">
                                {schema === 'auth' && (
                                  <Button
                                    size="mini"
                                    negative
                                    loading={cleanupLoading === table.table}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      executeCleanupAction(schema, table.table);
                                    }}
                                  >
                                    🧹 Cleanup
                                  </Button>
                                )}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                      </Fragment>
                    );
                  })
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5} textAlign="center" className="!py-8">
                    <span className="text-neutral-400">No table data available</span>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Form>
      </div>
    </div>
  );
};

DBTable.displayName = 'DBTable';

export default DBTable;
