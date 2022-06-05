import React from 'react';
import { Route,Routes } from 'react-router-dom';

import Config from './pages/Config';
import MailDetailPage from './pages/MailDetailPage';
import MailListPage from './pages/MailListPage';
import paths from './router/paths';

const App = () => (
  <Routes>
    <Route path={paths.CONFIG} element={<Config />} />
    <Route path={paths.MAIL_LIST} element={<MailListPage />} />
    <Route path={paths.MAIL_DETAIL} element={<MailDetailPage />} />
    <Route path={paths.ROOT} element={<MailListPage />} />
  </Routes>
);

export default App;
