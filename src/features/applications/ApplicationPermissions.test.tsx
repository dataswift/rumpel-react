import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import applicationsSlice from './applicationsSlice';
import toolsSlice from "../tools/toolsSlice";
import hmiSlice from "../hmi/hmiSlice";
import languageSlice from "../language/languageSlice";
import messagesSlice from "../messages/messagesSlice";
import TEST_HAT_APPLICATION from '../../testData/HatApplications';
import HatApplicationPermissions from "./ApplicationPermissions";
import { LanguageParamHandler } from "../../app/LanguageParamHandler";

export const store = configureStore({
  reducer: {
    applications: applicationsSlice,
    hmi: hmiSlice,
    tools: toolsSlice,
    language: languageSlice,
    messages: messagesSlice,
  },
  preloadedState: {
    applications: {
      applications: [TEST_HAT_APPLICATION],
      applicationHmi: undefined,
      applicationHmiState: 'idle',
      expirationTime: 20,
    },
    hmi: {
      parentApp: null,
      dependencyApps: [],
      dependencyTools: []
    },
    tools: {
      tools: [],
      expirationTime: 20,
    }
  },
});

describe('Application Permissions', () => {
  test('renders and displays the correct hat application permissions', () => {
    const history = createMemoryHistory({ initialEntries: ['/explore/App/1/permissions'] });

    render(
      <Router history={history}>
        <Route path="/explore/App/:appId/permissions">
          <Provider store={store}>
            <LanguageParamHandler>
              <HatApplicationPermissions />
            </LanguageParamHandler>
          </Provider>
        </Route>
      </Router>,
    );

    expect(screen.getByText('A*BA')).toBeInTheDocument();
    expect(screen.getByText('Test data use purpose')).toBeInTheDocument();
    fireEvent.click(screen.getByText('I Agree'));

    expect(history.location.pathname).toEqual('/explore/App/1');
  });
});
