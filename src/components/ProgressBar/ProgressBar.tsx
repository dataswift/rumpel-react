import React from 'react';
import './ProgressBar.scss';

type Props = {
  progress: number;
};

const ProgressBar: React.FC<Props> = ({ progress }) => (
  <div className="progress-bar">
    <div className="progress-bar-blue" style={{ width: `${progress}%` }} />
  </div>
);

export default ProgressBar;
