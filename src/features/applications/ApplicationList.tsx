import React from 'react';

import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';
import Card from '../../components/Card/Card';
import { getStatusIcon } from './helper';

import './HatApplication.scss';

export interface ApplicationListProps {
  hatApps: HatApplication[];
  onAppClick: (appId: string) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ hatApps, onAppClick }) => {
  return (
    <div className="hat-app-list">
      {hatApps.map((app) => (
        <Card
          key={app.application.id}
          onClick={() => onAppClick(app.application.id)}
          imgSrc={app.application.info.graphics.logo.normal}
          imgAltText="HAT Application Logo"
          name={app.application.info.name}
          description={app.application.info.headline}
          icon={getStatusIcon(app)}
          linkText="View App"
        />
      ))}
    </div>
  );
};

export default ApplicationList;
