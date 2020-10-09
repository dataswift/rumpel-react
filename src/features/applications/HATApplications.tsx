import * as React from 'react';

import TileHeader from '../../components/headers/TileHeader/TileHeader';

const HATApplications: React.FC = () => {
  return (
    <TileHeader
      title="HAT Applications"
      icon="touch_app"
      description="HAT apps are integrated with you HAT data to give you great services"
    />
  );
};

export default HATApplications;
