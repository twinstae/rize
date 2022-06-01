import React from 'react';
import { ROOT } from './router/paths';
import { Route, Routes } from 'react-router-dom';
import MailListPage from './pages/MailListPage';
import MailDetailPage from './pages/MailDetailPage';

import Test from './test/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MailListPage />} />
      <Route path="/mail" element={<MailListPage />} />
      <Route path="/mail/:id" element={<MailDetailPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
