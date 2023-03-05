import React from 'react';
import { RouteProps } from 'react-router-dom';

import TagEditPage from '../pages/TagEditPage';
import TagsListPage from '../pages/TagsListPage';

export type MyRouteProps = RouteProps & {
  name: string;
  label: string;
};

const routes: MyRouteProps[] = [
  {
    name: 'tags',
    label: 'Tags',
    path: '/',
    element: React.createElement(TagsListPage),
    // exact: true,
  },
  {
    name: 'tag',
    label: 'Tag details',
    path: '/tag/:id',
    element: React.createElement(TagEditPage),
    // exact: true,
  },
];

export default routes;
