import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import {LoadingSpinner} from "../components/shared/LoadingSpinner/LoadingSpinner";
const HatClaim = React.lazy(() =>
  import(
    /* webpackChunkName: "hat_claim" */
    '../components/hat-claim/HatClaim'
  )
);
const Login = React.lazy(() =>
  import(
    /* webpackChunkName: "user_login" */
    '../components/user/Login'
  )
);
const HatLogin = React.lazy(() =>
  import(
    /* webpackChunkName: "hat_login" */
    '../components/user/HatLogin'
  )
);

const HatSetupLogin = React.lazy(() =>
  import(
    /* webpackChunkName: "hat_setup_login" */
    '../components/user/HatSetupLogin'
  )
);
const PasswordRecover = React.lazy(() =>
  import(
    /* webpackChunkName: "password_recover" */
    '../components/user/PasswordRecover'
  )
);

const AppRouter = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner loadingText={'Loading'}/>}>
      <Switch>
        <Route path="/hat/claim/:claimToken" component={HatClaim} />
        <Route path="/user/login/" component={Login} />
        <Route path="/user/password/recover" component={PasswordRecover} />

        <PrivateRoute path={'/hatlogin'}>
          <HatLogin />
        </PrivateRoute>

        <PrivateRoute path={'/hat-setup-login'}>
          <HatSetupLogin />
        </PrivateRoute>

        <Route exact path="/" render={({ location }) => <Redirect to={location.hash.replace('#', '')} />} />
      </Switch>
    </Suspense>
  </Router>
);
export default AppRouter;
