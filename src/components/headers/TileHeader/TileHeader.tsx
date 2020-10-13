import * as React from 'react';

type TileHeaderProps = {
  title: string;
  icon: string;
  description: string;
};

const TileHeader: React.FC<TileHeaderProps> = ({ title, icon, description }) => {
  return (
    <header className="tile-header">
      <div className="tile-header-toolbar">
        <h2 className="tile-header-title">{title}</h2>
      </div>

      <div className="tile-header-content">
        <i className={'material-icons tile-header-icon'}>{icon}</i>
        <p className="tile-header-text">{description}</p>
      </div>
    </header>
  );
};

export default TileHeader;
