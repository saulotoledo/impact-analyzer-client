import React from 'react';
import { useParams } from 'react-router-dom';

import TableEntriesTable from '../components/TableEntriesTable/';
import Page from '../components/Page';

const actions = [
  {
    label: 'Return to all tables',
    link: '/',
  },
];

const TablesEditPage: React.FC = () => {
  const { id } = useParams();
  const idAsNumber = parseInt(id || '', 10) || undefined;

  return (
    <Page title="Table details" actions={actions}>
      <TableEntriesTable tableId={idAsNumber} />
    </Page>
  );
};

export default TablesEditPage;
