import React, { useState } from 'react';
import TablesTable from '../components/TablesTable/';
import TableUpload from '../components/TableUpload/';

import Page from '../components/Page';

const TablesListPage: React.FC = () => {
  const [lastChangeTimestamp, setLastChangeTimestamp] = useState<number>(
    Date.now()
  );

  const onSuccess = (): void => {
    setLastChangeTimestamp(Date.now());
  };

  return (
    <Page title="Tables">
      <TableUpload onSuccess={onSuccess} />
      <TablesTable key={lastChangeTimestamp} />
    </Page>
  );
};

export default TablesListPage;
