import React from 'react';
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/reducer/rootReducer";
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

type Props = {
    children: React.ReactNode
}

const Root: React.FC<Props> = props => (
    <Provider store={store}>
        {props.children}
    </Provider>
);
export default Root;
