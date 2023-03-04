import { RouteProps } from 'react-router-dom';

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
    element: TagsListPage({}),
    // exact: true,
  },
];

export default routes;
