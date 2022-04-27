import React from 'react';
import './LoadingSpinner.scss';

type Props = {
  loadingText: string;
};

export const LoadingSpinner: React.FC<Props> = (props) => (
  <div className="loading">
    <div className="loading-spinner" />
    <div className="loading-text">{props.loadingText}</div>
  </div>
);
