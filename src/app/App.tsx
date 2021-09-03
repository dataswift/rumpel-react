import React from 'react';
import AppRouter from './AppRouter';
import Root from './Root';
import { config } from '../app.config';

const App = () => {
  console.log('PDA Dashboard version:', config.version);

  return (
    <Root>
      <AppRouter />
    </Root>
  );
};

export default App;
