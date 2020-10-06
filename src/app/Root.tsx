import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { LanguageParamHandler } from "./LanguageParamHandler";

type Props = {
  children: React.ReactNode;
};

const Root: React.FC<Props> = props =>
  <Provider store={store}>
    <LanguageParamHandler>
      {props.children}
    </LanguageParamHandler>
  </Provider>;

export default Root;
