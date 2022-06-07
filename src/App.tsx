import { Button } from '@chakra-ui/react';
import React from 'react';
import { Route,Routes } from 'react-router-dom';

import Config from './pages/Config';
import MailDetailPage from './pages/MailDetailPage';
import MailListPage from './pages/MailListPage';
import paths from './router/paths';
import useNavigation from './router/useNavigation';
import Test from './test/Test';

const Init = () => {
  const { Link } = useNavigation();
  return (
    <div>

      <Link to={paths.TEST}>
        <Button>test</Button>
      </Link>
    </div>
  );
};

const App = () => (
  <Routes>
    <Route path={paths.CONFIG} element={<Config />} />
    <Route path={paths.MAIL_LIST} element={<MailListPage />} />
    <Route path={paths.MAIL_DETAIL} element={<MailDetailPage />} />
    <Route path={paths.TEST} element={<Test />} />
    <Route path={paths.ROOT} element={<MailListPage />} />
  </Routes>
);

export default App;
