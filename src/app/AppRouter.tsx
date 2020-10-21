import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import { PublicProfile } from "../features/public-profile/PublicProfile";
import { PrivateSpace } from "../components/PrivateSpace/PrivateSpace";
import AuthChangePassword from '../features/authentication/AuthChangePassword';
import AuthVerifyEmail from '../features/authentication/AuthVerifyEmail';
import HatApplicationPermissions from "../features/applications/ApplicationPermissions";
import DataPlugs from "../features/dataplugs/DataPlugs";
import DataPlugDetails from "../features/dataplugs/DataPlugDetails";

const HatClaim = React.lazy(
  () =>
    import(
      /* webpackChunkName: "hat_claim" */
      '../features/hat-claim/HatClaim'
    ),
);

const Login = React.lazy(
  () =>
    import(
      /* webpackChunkName: "user_login" */
      '../components/user/Login'
    ),
);

const Feed = React.lazy(() =>
  import(
    /* webpackChunkName: "feed" */
    '../features/feed/Feed'
  )
);

const HatLogin = React.lazy(
  () =>
    import(
      /* webpackChunkName: "hat_setup_login" */
      '../features/hat-login/HatLogin'
    ),
);

const PasswordRecover = React.lazy(
  () =>
    import(
      /* webpackChunkName: "password_recover" */
      '../components/user/PasswordRecover'
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
    <PrivateSpace>
      <PrivateRoute path={'/feed'}>
        <Feed />
      </PrivateRoute>

      <PrivateRoute exact path={'/explore/App'}>
        <HatApplications />
      </PrivateRoute>

      <PrivateRoute exact path={'/explore/App/:appId'}>
        <HatApplicationDetails />
      </PrivateRoute>

      <PrivateRoute exact path={'/explore/App/:appId/permissions'}>
        <HatApplicationPermissions />
      </PrivateRoute>

      <PrivateRoute exact path={'/explore/DataPlug'}>
        <DataPlugs />
      </PrivateRoute>

      <PrivateRoute exact path={'/explore/DataPlug/:appId'}>
        <DataPlugDetails />
      </PrivateRoute>

      <PrivateRoute exact path={'/explore/DataPlug/:appId/permissions'}>
        <HatApplicationPermissions />
      </PrivateRoute>
    </PrivateSpace>
  );
};

const AppRouter = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner loadingText={'Loading...'} />}>
      <Switch>
        <Route path="/public/profile" component={PublicProfile} />

        <Route path="/hat/claim/:claimToken" component={HatClaim} />
        <Route path="/user/login/" component={Login} />
        <Route path="/user/password/recover" component={PasswordRecover} />
        <Route path="/auth/login/" component={AuthLogin} />
        <Route path="/auth/recover-password" component={AuthRecoverPassword} />
        <Route path="/auth/change-password/:resetToken" component={AuthChangePassword} />
        <Route path="/auth/verify-email/:verifyToken" component={AuthVerifyEmail} />

        <PrivateRoute path={'/hatlogin'}>
          <HatLogin />
        </PrivateRoute>

        <PrivateRoute path={'/auth/oauth'} newAuth>
          <Oauth />
        </PrivateRoute>

        <PrivateRoute path={'/hat-setup-login'}>
          <HatLogin />
        </PrivateRoute>


        <Route exact path="/" render={({ location }) => {
          const redirectTo = location.hash
            ? location.hash.replace('#', '')
            : '/public/profile';
          
          return <Redirect to={redirectTo} />;
        }} />

        <PrivateSpaceRoutes />
      </Switch>
    </Suspense>
  </Router>
);
export default AppRouter;
