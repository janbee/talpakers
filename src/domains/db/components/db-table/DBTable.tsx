import * as React from 'react';
import { Fragment, FC, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Button, Dimmer, Form, Icon, Loader, Message, Segment, Statistic, Table } from 'semantic-ui-react';
import useDbTable, { computeSchemaStats, formatBytes, groupTablesBySchema } from './useDbTable';

/**
 * DbTable component
 * Displays database storage usage overview and per-table breakdown grouped by schema
 */
const DbTableComponent: FC = () => {
  const { dbUsage, loading, error, retry, cleanupLoading, cleanupMessage, executeCleanup, dismissCleanupMessage } =
    useDbTable();
  const [expandedSchemas, setExpandedSchemas] = useState<Set<string>>(new Set(['TalpakersDB']));

  const groupedTables = useMemo(() => groupTablesBySchema(dbUsage?.tables), [dbUsage?.tables]);
  const schemaStats = useMemo(() => computeSchemaStats(groupedTables), [groupedTables]);

  const toggleSchema = (schema: string) => {
    const newSet = new Set(expandedSchemas);
    if (newSet.has(schema)) {
      newSet.delete(schema);
    } else {
      newSet.add(schema);
    }
    setExpandedSchemas(newSet);
  };

  // Error state
  if (!loading && error) {
    return (
      <div data-testid="DbTable" className={classNames('w-full m-4 bg-neutral-800 rounded-lg p-4')}>
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
      <div data-testid="DbTable" className={classNames('w-full m-4 bg-neutral-800 rounded-lg p-4')}>
        <Message info>
          <Message.Header>No database usage data available</Message.Header>
          <p>Unable to retrieve database statistics at this time.</p>
        </Message>
      </div>
    );
  }

  const sortedSchemas = Object.entries(groupedTables).sort(([, tablesA], [, tablesB]) => {
    const bytesA = tablesA.reduce((sum, t) => sum + t.total_bytes, 0);
    const bytesB = tablesB.reduce((sum, t) => sum + t.total_bytes, 0);
    return bytesB - bytesA;
  });

  return (
    <div data-testid="DbTable" className={classNames('w-full m-4 bg-neutral-800 rounded-lg relative')}>
      <div className={classNames('flex flex-col p-4 h-full')}>
        <div className={classNames('flex flex-row items-start justify-between h-12')}>
          <span className={classNames('dark:text-white text-2xl')}>Database Usage</span>
          <Icon circular inverted className={classNames('cursor-pointer !text-xl !mt-[-3px]')} name="refresh" onClick={retry} />
        </div>

        {dbUsage?.used && (
          <Segment inverted className={classNames('!bg-neutral-900 !border-neutral-700')}>
            <Statistic.Group widths="two">
              <Statistic inverted>
                <Statistic.Value className={classNames('!text-white')}>{dbUsage.used.used_pretty}</Statistic.Value>
                <Statistic.Label className={classNames('!text-neutral-400')}>Data Used</Statistic.Label>
              </Statistic>
              <Statistic inverted>
                <Statistic.Value className={classNames('!text-white')}>{dbUsage.used.used_gb_pretty}</Statistic.Value>
                <Statistic.Label className={classNames('!text-neutral-400')}>GB Used</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        )}

        {cleanupMessage && (
          <Message
            onDismiss={dismissCleanupMessage}
            negative={cleanupMessage.type === 'error'}
            positive={cleanupMessage.type === 'success'}
            className={classNames('mb-4')}
          >
            {cleanupMessage.text}
          </Message>
        )}

        <hr />

        <Form className={classNames('flex-1 overflow-auto mt-4')}>
          <Table
            size="small"
            compact
            striped
            celled
            inverted
            unstackable
            aria-label="Database table storage usage breakdown"
          >
            <Table.Header className={classNames('bg-neutral-900 sticky top-0 z-10')}>
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
              {sortedSchemas.length > 0 ? (
                sortedSchemas.map(([schema, tables]) => {
                  const isExpanded = expandedSchemas.has(schema);
                  const stats = schemaStats[schema];

                  return (
                    <Fragment key={schema}>
                      <Table.Row
                        className={classNames('!bg-neutral-850 hover:!bg-neutral-800 cursor-pointer')}
                        onClick={() => toggleSchema(schema)}
                      >
                        <Table.Cell textAlign="center">
                          <Icon name={isExpanded ? 'chevron down' : 'chevron right'} className={classNames('!m-0')} />
                        </Table.Cell>
                        <Table.Cell className={classNames('!font-semibold !text-blue-300')}>📦 {schema}</Table.Cell>
                        <Table.Cell textAlign="center" className={classNames('!text-yellow-300')}>
                          {formatBytes(stats.dataBytes)}
                        </Table.Cell>
                        <Table.Cell textAlign="center" className={classNames('!text-yellow-300')}>
                          {formatBytes(stats.totalBytes)}
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          {formatBytes(stats.totalBytes - stats.dataBytes)}
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>

                      {isExpanded &&
                        tables.map((table, index) => (
                          <Table.Row key={`${schema}-${table.table}-${index}`} className={classNames('!bg-neutral-900')}>
                            <Table.Cell></Table.Cell>
                            <Table.Cell className={classNames('!pl-8')}>→ {table.table}</Table.Cell>
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
                                    executeCleanup(schema, table.table);
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
                  <Table.Cell colSpan={6} textAlign="center" className={classNames('!py-8')}>
                    <span className={classNames('text-neutral-400')}>No table data available</span>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Form>
      </div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};

DbTableComponent.displayName = 'DbTable';
export default DbTableComponent;