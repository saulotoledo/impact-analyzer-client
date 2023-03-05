import React from 'react';
import { Route, Routes } from 'react-router';

import routes from './index';

const AppRouter: React.FC = () => (
  <Routes>
    {routes.map((route, key) => (
      <Route key={key} path={route.path} element={route.element} />
    ))}
  </Routes>
);

export default AppRouter;
