import React from 'react';
import logo from '../../../../assets/icons/hat-data-rights-icon.svg';

export const HmiBaasHeader: React.FC = () => {
  return (
    <div className={'hmi-daas-header-wrapper'}>
      <img
        className={'hmi-data-rights-img'}
        style={{ marginBottom: '0' }}
        src={logo}
        alt={'HAT Data rights protected'}
      />
    </div>
  );
};
