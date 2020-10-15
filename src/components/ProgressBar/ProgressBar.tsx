import React from "react";
import './ProgressBar.scss';

type Props = {
    progress: number;
}
export const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div className={'progress-bar'}>
      <div className={'progress-bar-blue'} style={{ width: `${ progress }%` }}/>
    </div>
  );
};
