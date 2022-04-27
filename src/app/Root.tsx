import React from 'react';
import { Provider } from 'react-redux';
import { RibbonProvider } from '@dataswift/shared';
import { store } from './store';
import { LanguageParamHandler } from './LanguageParamHandler';

type Props = {
  children: React.ReactNode;
};

const Root: React.FC<Props> = (props) => (
  <Provider store={store}>
    <RibbonProvider>
      <LanguageParamHandler>{props.children}</LanguageParamHandler>
    </RibbonProvider>
  </Provider>
);

export default Root;
