import { useQuery } from '../hooks/useQuery';
import { Redirect, RedirectProps, Route } from 'react-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithToken, selectIsAuthenticated } from '../features/authentication/authenticationSlice';
import Cookies from 'js-cookie';
import { HatClientService } from '../services/HatClientService';

interface OwnProps {
  children: React.ReactNode;
  path?: string;
  exact?: boolean;
}

export function PrivateRoute({ children, ...rest }: OwnProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    const tokenParam = query.get('token');
    const hatSvc = HatClientService.getInstance();

    if (tokenParam && !hatSvc.isTokenExpired(tokenParam)) {
      dispatch(loginWithToken(tokenParam));
      HatClientService.getInstance(tokenParam);
    } else if (token && !hatSvc.isTokenExpired(token)) {
      dispatch(loginWithToken(token));
      HatClientService.getInstance(token);
    }
  }, [query, dispatch]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <DelayedRedirect
            to={{
              pathname: '/user/login',
              state: { from: location },
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
