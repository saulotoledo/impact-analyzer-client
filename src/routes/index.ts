import React from 'react';
import { RouteProps } from 'react-router-dom';

import TablesListPage from '../pages/TablesListPage';
import TagEditPage from '../pages/TagEditPage';
import TagsListPage from '../pages/TagsListPage';

export type MyRouteProps = RouteProps & {
  name: string;
  label: string;
};

const routes: MyRouteProps[] = [
  {
    name: 'tables',
    label: 'Tables',
    path: '/',
    element: React.createElement(TablesListPage),
  },
  {
    name: 'tags',
    label: 'Tags',
    path: '/tags',
    element: React.createElement(TagsListPage),
  },
  {
    name: 'tag',
    label: 'Tag details',
    path: '/tag/:id',
    element: React.createElement(TagEditPage),
  },
];

export default routes;
