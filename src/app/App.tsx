import React from 'react';
import AppRouter from './AppRouter';
import Root from './Root';
import { LanguageParamHandler } from './LanguageParamHandler';

const App = () => (
  <Root>
    <LanguageParamHandler>
      <AppRouter />
    </LanguageParamHandler>
  </Root>
);
export default App;
