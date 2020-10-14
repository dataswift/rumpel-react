import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import AuthChangePassword from '../features/authentication/AuthChangePassword';
import AuthVerifyEmail from '../features/authentication/AuthVerifyEmail';

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
      '../features/applications'
    ),
);

const Oauth = React.lazy(
  () =>
    import(
      /* webpackChunkName: "auth_oauth" */
      '../features/oauth/Oauth'
    ),
);

const AppRouter = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner loadingText={'Loading...'} />}>
      <Switch>
        <Route path="/hat/claim/:claimToken" component={HatClaim} />
        <Route path="/user/login/" component={Login} />
        <Route path="/user/password/recover" component={PasswordRecover} />
        <Route path="/auth/login/" component={AuthLogin} />
        <Route path="/auth/recover-password" component={AuthRecoverPassword} />
        <Route path="/auth/change-password/:resetToken" component={AuthChangePassword} />
        <Route path="/auth/verify-email/:verifyToken" component={AuthVerifyEmail} />

        <PrivateRoute path={'/applications'}>
          <HatApplications />
        </PrivateRoute>

        <PrivateRoute path={'/hatlogin'}>
          <HatLogin />
        </PrivateRoute>

        <PrivateRoute path={'/auth/oauth'} newAuth>
          <Oauth />
        </PrivateRoute>

        <PrivateRoute path={'/hat-setup-login'}>
          <HatLogin />
        </PrivateRoute>

        <Route exact path="/" render={({ location }) => <Redirect to={location.hash.replace('#', '')} />} />
      </Switch>
    </Suspense>
  </Router>
);
export default AppRouter;
