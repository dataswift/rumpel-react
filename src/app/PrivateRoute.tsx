import { useQuery } from '../hooks/useQuery';
import { Redirect, Route } from 'react-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AuthState,
  loginWithToken,
  selectAuthState,
  selectIsAuthenticated,
} from '../features/authentication/authenticationSlice';

interface OwnProps {
  children: React.ReactNode;
  path?: string;
  exact?: boolean;
}

export function PrivateRoute({ children, ...rest }: OwnProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    // const token = query.get("token");
    //
    // if (token) {
    //     dispatch(loginWithToken(token));
    // }
  }, []);

  // if (authState === AuthState.LOGIN_FAILED) {
  //     return <Redirect
  //         to={{
  //             pathname: "/user/login",
  //             state: { from: location }
  //         }}
  //     />
  // }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
