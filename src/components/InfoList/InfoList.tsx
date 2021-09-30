import React from 'react';

import './InfoList.scss';

type InfoListProps = {
  title: string;
  data: Array<{ [key: string]: string }>;
};

const isTextURL = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))', // OR ip (v4) address
    'i',
  );
  return !!pattern.test(str);
};

const InfoList: React.FC<InfoListProps> = ({ title, data }) => (
  <div className="info-card">
    <h5 className="info-card-title">{title}</h5>

    <div className="info-card-list">
      {data.map((item) => {
        const entry = Object.entries(item)[0];
        const text = entry[1];

        return (
          <div key={entry[0]} className="info-card-item">
            <div className="info-card-item-content">
              <span className="info-card-item-key text-medium">{entry[0]} </span>

              {isTextURL(text) ? (
                <a className="info-card-item-value text-medium" href={text}>
                  {text}
                </a>
              ) : (
                <span className="info-card-item-value text-medium">{text}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default InfoList;
