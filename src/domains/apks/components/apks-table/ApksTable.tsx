import { FC } from 'react';
import { Table, Message, Button, Icon, Form, Dimmer, Loader } from 'semantic-ui-react';
import useApksTable, { extractBuildName, extractVersion } from './useApksTable';

/**
 * ApksTable component
 * Displays a table of APK files from Google Drive with loading, error, and empty states
 */
const ApksTable: FC = () => {
  const { files, loading, error, retry } = useApksTable();

  // Error state
  if (!loading && error) {
    return (
      <div className="w-full m-4 bg-neutral-800 rounded-lg p-4">
        <Message negative>
          <Message.Header>Failed to load APK files</Message.Header>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
          <Button primary size="small" onClick={retry}>
            Retry
          </Button>
        </Message>
      </div>
    );
  }

  // Empty state
  if (!loading && !error && files.length === 0) {
    return (
      <div className="w-full m-4 bg-neutral-800 rounded-lg p-4">
        <Message info>
          <Message.Header>No APK files found</Message.Header>
          <p>The Google Drive folder is currently empty.</p>
        </Message>
      </div>
    );
  }

  // Loading or data state
  return (
    <div className="w-full m-4 bg-neutral-800 rounded-lg relative">
      <div className="flex flex-col p-4 h-full">
        <div className="flex flex-row items-start justify-between h-12">
          <span className="dark:text-white text-2xl">APK Files ({files.length})</span>
          <Icon
            circular
            inverted
            className="cursor-pointer !text-xl !mt-[-3px]"
            onClick={retry}
            name="refresh"
          />
        </div>
        <hr />
        <Form className="flex-1 overflow-auto mt-4">
          <Table
            size="small"
            selectable
            compact
            striped
            celled
            inverted
            unstackable
            aria-label="List of available APK files"
          >
            <Table.Header className="bg-neutral-900 sticky top-0 z-10">
              <Table.Row>
                <Table.HeaderCell textAlign="center">BUILD</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">VERSION</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {files.map((file) => {
                const buildName = extractBuildName(file.name);
                const version = extractVersion(file.name);
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
                
                const handleRowClick = () => {
                  window.open(downloadUrl, '_blank');
                };
                
                return (
                  <Table.Row key={file.id} onClick={handleRowClick} className="cursor-pointer">
                    <Table.Cell>
                      <a
                        href={downloadUrl}
                        className="text-white cursor-pointer hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {buildName || file.name}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{version || 'N/A'}</Table.Cell>
                  </Table.Row>
                );
              })}
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

ApksTable.displayName = 'ApksTable';

export default ApksTable;

