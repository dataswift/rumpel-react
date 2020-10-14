import * as React from 'react';

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
  return (
    <div className="details-header" style={{ backgroundColor }}>
      <div className="details-header-toolbar">{toolbarActions}</div>

      <div className="details-header-card">
        <div className="details-header-logo-wrapper">
          <img className="details-header-logo" src={logoSrc} alt={logoAltText} />
        </div>

        {children}
      </div>
    </div>
  );
};

export default DetailsHeader;
