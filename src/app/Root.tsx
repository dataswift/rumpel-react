import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

type Props = {
  children: React.ReactNode;
};

const Root: React.FC<Props> = props => <Provider store={store}>{props.children}</Provider>;

export default Root;
