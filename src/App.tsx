import React from 'react';
import LeftDrawler from './components/LeftDrawer';
import { Stack } from './router/useStatckNavigation';

const App = () => {
  return (
    <LeftDrawler>
      <Stack />
    </LeftDrawler>
  );
};

export default App;
