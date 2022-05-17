import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import profileSlice, { DEFAULT_PHATA_BUNDLE, DEFAULT_PROFILE_SHARE_CONFIG} from "./profileSlice";
import TEST_PROFILE from "../../testData/Profile";
import authenticationSlice from "../authentication/authenticationSlice";
import TEST_AUTH from "../../testData/Auth";
import ProfileDetails from "./ProfileDetails";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    authentication: authenticationSlice,
  },
  preloadedState: {
    profile: {
      profile: TEST_PROFILE,
      expirationTime: 20,
      profileBundle: DEFAULT_PHATA_BUNDLE,
      profileSharingConfig: DEFAULT_PROFILE_SHARE_CONFIG,
      profileFetched: true,
      profileBundleFetched: false,
    },
    authentication: TEST_AUTH
  },
});

describe('Profile Details', () => {
  test('renders and displays the correct profile details and fields', () => {
    const history = createMemoryHistory({ initialEntries: ['/profile'] });

    render(
      <Router history={history}>
        <Route path="/profile">
          <Provider store={store}>
            <ProfileDetails />
          </Provider>
        </Route>
      </Router>,
    );

    expect(screen.getByText('Personal Info')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://test-blog.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://test-website.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('TestFirstName')).toBeInTheDocument();
    expect(screen.getByDisplayValue('TestLastName')).toBeInTheDocument();
    expect(screen.getByDisplayValue('male')).toBeInTheDocument();
  });
});
