import React from 'react';
import AppRouter from './AppRouter';
import Root from './Root';
import { LanguageParamHandler } from './LanguageParamHandler';
import {environment} from "../environment";

const App = () => (
    <Root>
        {    console.log(environment)}
    <LanguageParamHandler>
      <AppRouter />
    </LanguageParamHandler>
  </Root>
);
export default App;
