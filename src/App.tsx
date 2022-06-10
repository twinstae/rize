import React from 'react';
import { Route,Routes, useLocation } from 'react-router-dom';

import Config from './pages/Config';
import InitPage from './pages/InitPage';
import MailDetailPage from './pages/MailDetailPage';
import MailListPage from './pages/MailListPage';
import paths from './router/paths';

const App = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path={paths.CONFIG} element={<Config />} />
      <Route path={paths.MAIL_LIST} element={<MailListPage />} />
      <Route path={paths.MAIL_DETAIL} element={<MailDetailPage />} />
      <Route path={paths.ROOT} element={<InitPage />} />
    </Routes>
  );
};

export default App;
