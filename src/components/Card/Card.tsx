import * as React from 'react';

import './Card.scss';
import { useState } from 'react';
import placeholder from '../../assets/icons/app-logo-placeholder.svg';

type CardProps = {
  imgSrc: string;
  imgAltText: string;
  name: string;
  description: string | JSX.Element;
  icon?: string;
  linkText?: string;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({
  imgSrc,
  name,
  description,
  icon,
  imgAltText,
  linkText,
  onClick,
}) => {
  const [imageSrc, setImageSrc] = useState(imgSrc);

  return (
    <div className="card" onClick={onClick}>
      <div className="card-content">
        <img
          className="card-logo"
          src={imageSrc}
          onError={() => setImageSrc(placeholder)}
          height="100"
          alt={imgAltText}
        />

        <div className="card-description">
          <h3 className="card-name">{name}</h3>
          <div className="card-headline">{description}</div>
        </div>

        {linkText && <div className="card-link">{linkText}</div>}

        <i className="material-icons card-icon">{icon}</i>
      </div>
    </div>
  );
};

export default Card;
