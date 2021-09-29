import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import UniversalDataViewerDataSources from '../features/universal-data-viewer/UniversalDataViewerDataSources';
import UniversalDataViewerEndpoint from '../features/universal-data-viewer/UniversalDataViewerEndpoint';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { PublicProfile } from '../features/public-profile/PublicProfile';
import AuthChangePassword from '../features/authentication/AuthChangePassword';
import AuthVerifyEmail from '../features/authentication/AuthVerifyEmail';
import HatApplicationPermissions from '../features/applications/ApplicationPermissions';
import DataPlugs from '../features/dataplugs/DataPlugs';
import DataPlugDetails from '../features/dataplugs/DataPlugDetails';

import { LayoutRoute, PrivateLayoutRoute, PrivateSpaceRoute } from './Layouts';
import Profile from '../features/profile/Profile';
import { HatTools, HatToolDetails } from '../features/tools';
import { Settings } from '../features/settings';
import ChangePassword from '../components/user/ChangePassword';
import DataDebits from '../features/data-debit';
import DataDebitDetails from '../features/data-debit/DataDebitDetails';
import { LandingLoginPage, RegistrationPage } from '../pages';

const HatClaim = React.lazy(
  () =>
    import(
      /* webpackChunkName: "hat_claim" */
      '../features/hat-claim/HatClaim'
    ),
);

const Feed = React.lazy(
  () =>
    import(
      /* webpackChunkName: "feed" */
      '../features/feed/Feed'
    ),
);

const HatLogin = React.lazy(
  () =>
    import(
      /* webpackChunkName: "hat_setup_login" */
      '../features/hat-login/HatLogin'
    ),
);

const AuthLogin = React.lazy(
  () =>
    import(
      /* webpackChunkName: "auth_login" */
      '../features/authentication/AuthLogin'
    ),
);

const AuthRecoverPassword = React.lazy(
  () =>
    import(
      /* webpackChunkName: "auth_recover_password" */
      '../features/authentication/AuthRecoverPassword'
    ),
);

const HatApplications = React.lazy(
  () =>
    import(
      /* webpackChunkName: "hat_applications" */
      '../features/applications/HatApplications'
    ),
);

const HatApplicationDetails = React.lazy(
  () =>
    import(
      /* webpackChunkName: "hat_application_details" */
      '../features/applications/ApplicationDetails'
    ),
);

const Oauth = React.lazy(
  () =>
    import(
      /* webpackChunkName: "auth_oauth" */
      '../features/oauth/Oauth'
    ),
);

const PrivateSpaceRoutes = () => {
  return (
    <Switch>
      <PrivateSpaceRoute path={'/feed'}>
        <Feed />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/explore/App'}>
        <HatApplications />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/explore/App/:appId'}>
        <HatApplicationDetails />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/explore/App/:appId/permissions'}>
        <HatApplicationPermissions />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/explore/DataPlug'}>
        <DataPlugs />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/explore/DataPlug/:appId'}>
        <DataPlugDetails />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/explore/DataPlug/:appId/permissions'}>
        <HatApplicationPermissions />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/universal-data-viewer'}>
        <UniversalDataViewerDataSources />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute path={'/universal-data-viewer/:namespace/:endpoint'}>
        <UniversalDataViewerEndpoint />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/profile'}>
        <Profile />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/tools'}>
        <HatTools />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/tools/:toolId'}>
        <HatToolDetails />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute path={'/settings'}>
        <Settings />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute path={'/user/password/change'}>
        <ChangePassword />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute exact path={'/data-debit'}>
        <DataDebits />
      </PrivateSpaceRoute>

      <PrivateSpaceRoute path={'/data-debit/:dataDebitParam'}>
        <DataDebitDetails />
      </PrivateSpaceRoute>
    </Switch>
  );
};

const AppRouter = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner loadingText={'Loading...'} />}>
      <Switch>
        <LayoutRoute path="/public/profile">
          <PublicProfile />
        </LayoutRoute>

        <LayoutRoute path="/login" footerBackgroundColor="#fff">
          <LandingLoginPage />
        </LayoutRoute>

        <LayoutRoute path="/register" footerBackgroundColor="#fff">
          <RegistrationPage />
        </LayoutRoute>

        <LayoutRoute path="/services/signup" footerBackgroundColor="#fff">
          <RegistrationPage />
        </LayoutRoute>

        <LayoutRoute path="/auth/login" issuedByFooter footerBackgroundColor="#fff">
          <AuthLogin />
        </LayoutRoute>

        <LayoutRoute path="/auth/recover-password" issuedByFooter footerBackgroundColor="#fff">
          <AuthRecoverPassword />
        </LayoutRoute>

        <LayoutRoute path="/auth/change-password/:resetToken" issuedByFooter footerBackgroundColor="#fff">
          <AuthChangePassword />
        </LayoutRoute>

        <LayoutRoute path="/auth/verify-email/:verifyToken" issuedByFooter footerBackgroundColor="#fff">
          <AuthVerifyEmail />
        </LayoutRoute>

        <PrivateLayoutRoute path={'/auth/oauth'} newAuth issuedByFooter footerBackgroundColor="#fff">
          <Oauth />
        </PrivateLayoutRoute>


        {/*
          The following routes are deprecated.
        */}
        <LayoutRoute path="/hat/claim/:claimToken">
          <HatClaim />
        </LayoutRoute>

        <LayoutRoute path="/user/login/">
          <AuthLogin />
        </LayoutRoute>

        <LayoutRoute path="/user/password/recover">
          <AuthRecoverPassword />
        </LayoutRoute>

        <PrivateLayoutRoute path={'/hatlogin'}>
          <HatLogin />
        </PrivateLayoutRoute>

        <PrivateLayoutRoute path={'/hat-setup-login'}>
          <HatLogin />
        </PrivateLayoutRoute>

        <Route
          exact
          path="/"
          render={({ location }) => {
            const redirectTo = location.hash ? location.hash.replace('#', '') : '/login';

            return <Redirect to={redirectTo} />;
          }}
        />

        <PrivateSpaceRoutes />
      </Switch>
    </Suspense>
  </Router>
);
export default AppRouter;
