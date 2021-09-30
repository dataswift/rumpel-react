import React, { useEffect } from 'react';
import './LandingLoginPage.scss';
import LandingIllustration from '../../components/Landing/LandingIllustration';
import LandingLoginView from '../../components/Landing/LandingLoginView';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { HatClientService } from "../../services/HatClientService";
import { loginWithToken, selectIsAuthenticated } from "../../features/authentication/authenticationSlice";
import { Redirect } from "react-router-dom";

const LandingLoginPage: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenStored = Cookies.get('token') || sessionStorage.getItem('token');

    const hatSvc = HatClientService.getInstance();

    if (tokenStored && !hatSvc.isTokenExpired(tokenStored)) {
      dispatch(loginWithToken(tokenStored));
      HatClientService.getInstance(tokenStored);
    }
  }, [dispatch]);

  if (isAuthenticated) {
    return <Redirect to="/feed" />;
  }

  return (
    <div className="landing-login-page">
      <LandingIllustration />
      <LandingLoginView />
    </div>
  );
};

export default LandingLoginPage;
