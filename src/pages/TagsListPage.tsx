import React from 'react';

import TagsTable from '../components/TagsTable/';
import Page from '../components/Page';

const TagsListPage: React.FC = () => (
  <Page title="Tags">
    <TagsTable />
  </Page>
);

export default TagsListPage;
