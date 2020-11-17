import * as React from 'react';
import { useState } from 'react';
import placeholder from '../../../assets/icons/app-logo-placeholder.svg';

type DetailsHeaderProps = {
  logoSrc: string;
  logoAltText: string;
  toolbarActions?: React.ReactNode;
  backgroundColor?: string;
  isTool?: boolean;
};

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  logoSrc,
  logoAltText,
  toolbarActions,
  backgroundColor = 'rgba(43, 49, 61, 0.7)',
  children,
  isTool = false,
}) => {
  const [imageSrc, setImageSrc] = useState(logoSrc);

  return (
    <div className={`details-header ${isTool ? 'tool' : ''}`} style={{ backgroundColor }}>
      <div className="details-header-toolbar">{toolbarActions}</div>

      <div className={`details-header-card ${isTool ? 'tool' : ''}`}>
        <div className="details-header-logo-wrapper">
          <img
            className="details-header-logo"
            src={imageSrc}
            onError={() => setImageSrc(placeholder)}
            alt={logoAltText}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default DetailsHeader;
