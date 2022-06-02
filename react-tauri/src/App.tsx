import React from 'react';
import paths from './router/paths';
import { Route, Routes } from 'react-router-dom';
import MailListPage from './pages/MailListPage';
import MailDetailPage from './pages/MailDetailPage';
import Config from './pages/Config';

import Test from './test/Test';

function App() {
  return (
    <Routes>
      <Route path={paths.CONFIG} element={<Config />} />
      <Route path={paths.MAIL_LIST} element={<MailListPage />} />
      <Route path={paths.MAIL_DETAIL} element={<MailDetailPage />} />
      <Route path="/test" element={<Test />} />
      <Route path={paths.ROOT} element={<MailListPage />} />
    </Routes>
  );
}

export default App;
