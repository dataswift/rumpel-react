import React from "react";
import './PasswordMeter.scss';

type Props = {
    children: React.ReactNode;
};

const PasswordMeterBackground: React.FC<Props> = ({ children }) => {
  return (
    <div className={'password-meter-background'}>
      <div className={'password-meter-background-content'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="261" height="6" viewBox="0 0 261 6">
          <rect width="261" height="6" rx="3" fill="#e5e6e3" opacity="0.502"/>
        </svg>
      </div>
      {children}
    </div>
  );
};

const PasswordMeterWeak: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
      width="92"
      height="6"
      viewBox="0 0 92 6">
      <defs>
        <linearGradient id="a" y1="0.5" x2="0.993" y2="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#e50d42"/>
          <stop offset="1" stopColor="#feae37"/>
        </linearGradient>
      </defs>
      <rect width="92" height="6" rx="3" fill="url(#a)"/>
    </svg>
  );
};

const PasswordMeterStrong: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
      width="261"
      height="6"
      viewBox="0 0 261 6">
      <defs>
        <linearGradient id="a" y1="0.5" x2="0.5" y2="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#e50d42"/><stop offset="0.246" stopColor="#feae37"/>
          <stop offset="0.483" stopColor="#a8c62b"/>
          <stop offset="1" stopColor="#a8c62b"/>
        </linearGradient>
      </defs>
      <rect width="261" height="6" rx="3" fill="url(#a)"/>
    </svg>
  );
};

export const PasswordMeter: React.FC<{strong: boolean}> = ({ strong }) => {
  return (
    <PasswordMeterBackground>
      {strong ?
        <PasswordMeterStrong />
        :
        <PasswordMeterWeak />
      }
    </PasswordMeterBackground>
  );
};

