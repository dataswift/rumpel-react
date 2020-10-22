import * as React from 'react';
import FormatMessage from '../../../features/messages/FormatMessage';

type TileHeaderProps = {
  titleId: string;
  icon: string;
  descriptionId: string;
};

const TileHeader: React.FC<TileHeaderProps> = ({ titleId, icon, descriptionId }) => {
  return (
    <header className="tile-header">
      <div className="tile-header-toolbar">
        <h2 className="tile-header-title"><FormatMessage id={titleId} /></h2>
      </div>

      <div className="tile-header-content">
        <i className={'material-icons tile-header-icon'}>{icon}</i>
        <p className="tile-header-text"><FormatMessage id={descriptionId} /></p>
      </div>
    </header>
  );
};

export default TileHeader;
