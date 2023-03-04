import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '../routes/AppRouter';
import Navbar from './Navbar';

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <AppRouter />
  </BrowserRouter>
);

export default App;
