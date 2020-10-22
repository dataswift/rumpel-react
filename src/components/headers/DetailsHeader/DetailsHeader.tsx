import * as React from 'react';
import { useState } from "react";
import placeholder from "../../../assets/icons/app-logo-placeholder.svg";

type DetailsHeaderProps = {
  logoSrc: string;
  logoAltText: string;
  toolbarActions?: React.ReactNode;
  backgroundColor?: string;
};

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  logoSrc,
  logoAltText,
  toolbarActions,
  backgroundColor,
  children,
}) => {
  const [imageSrc, setImageSrc] = useState(logoSrc);

  return (
    <div className="details-header" style={{ backgroundColor }}>
      <div className="details-header-toolbar">{toolbarActions}</div>

      <div className="details-header-card">
        <div className="details-header-logo-wrapper">
          <img className="details-header-logo" 
            src={imageSrc}
            onError={() => setImageSrc(placeholder)}
            alt={logoAltText} />
        </div>

        {children}
      </div>
    </div>
  );
};

export default DetailsHeader;
