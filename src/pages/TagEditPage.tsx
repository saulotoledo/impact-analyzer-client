import React from 'react';
import { useParams } from 'react-router-dom';

import TagEdit from '../components/TagEdit/';
import Page from '../components/Page';

const actions = [
  {
    label: 'Return to all tags',
    link: '/tags',
  },
];

const TagEditPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Page title="Tag details" actions={actions}>
      <TagEdit id={id} />
    </Page>
  );
};

export default TagEditPage;
