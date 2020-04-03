import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginWithToken } from '../features/authentication/authenticationSlice';
import { useQuery } from '../hooks/useQuery';

type Props = {
  children: React.ReactNode;
};

export const AuthWithToken: React.FC<Props> = (props) => {
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = query.get('token');

    if (token) {
      dispatch(loginWithToken(token));
    }
  }, []);

  return <>{props.children}</>;
};
