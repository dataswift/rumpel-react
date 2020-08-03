import React from 'react';
import AppRouter from './AppRouter';
import Root from './Root';
import { LanguageParamHandler } from './LanguageParamHandler';
import { config } from "../app.config";

const App = () => {
  console.log('PDA Dashboard version:', config.version);

  return (
    <Root>
      <LanguageParamHandler>
        <AppRouter/>
      </LanguageParamHandler>
    </Root>
  );
};

export default App;
