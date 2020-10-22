import { Redirect, RedirectProps, Route, RouteProps } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithToken, selectIsAuthenticated } from '../features/authentication/authenticationSlice';
import Cookies from 'js-cookie';
import { HatClientService } from '../services/HatClientService';
import * as queryString from 'query-string';

interface OwnProps extends RouteProps {
  newAuth?: boolean;
}

type Query = {
  token?: string;
  repeat?: string;
  email?: string;
  application_id?: string;
  redirect_uri?: string;
};

export function PrivateRoute({ children, newAuth, ...rest }: OwnProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // TODO Add the type to the state useState<Query>
  const [query, setQuery] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenStored = Cookies.get('token') || sessionStorage.getItem('token');
    const { token, repeat, email, application_id, redirect_uri } = queryString.parse(window.location.search) as Query;
    setQuery({
      repeat: repeat === 'true',
      email: email,
      applicationId: application_id,
      redirectUri: redirect_uri,
    });

    const hatSvc = HatClientService.getInstance();

    if (token && !hatSvc.isTokenExpired(token)) {
      dispatch(loginWithToken(token));
      HatClientService.getInstance(token);
    } else if (tokenStored && !hatSvc.isTokenExpired(tokenStored)) {
      dispatch(loginWithToken(tokenStored));
      HatClientService.getInstance(tokenStored);
    }
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <DelayedRedirect
            to={{
              pathname: newAuth ? '/auth/login' : '/user/login',
              state: { from: location, query: query },
            }}
            delay={100}
          />
        )
      }
    />
  );
}

interface DelayedProps {
  delay: number;
}

interface DelayedState {
  timeToRedirect: boolean;
}

class DelayedRedirect extends React.Component<RedirectProps & DelayedProps, DelayedState> {
  timeout: any = null;

  state: DelayedState = {
    timeToRedirect: false,
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        timeToRedirect: true,
      });
    }, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { ...props } = this.props;
    const { timeToRedirect } = this.state;

    if (timeToRedirect) {
      return <Redirect {...props} />;
    }

    return null;
  }
}
