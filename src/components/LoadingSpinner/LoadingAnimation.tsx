import React from 'react';
import ds200 from '../../assets/icons/ds_mark_d_200.svg';
import ds2001 from '../../assets/icons/ds_mark_d_200-1.svg';
import ds2002 from '../../assets/icons/ds_mark_d_200-2.svg';
import ds2003 from '../../assets/icons/ds_mark_d_200-3.svg';

export const LoadingAnimation: React.FC = () => (
  <div className="ds-loading-animation">
    <img src={ds200} id="ds-loading-d-shadow-1" alt="" />
    <img src={ds2001} id="ds-loading-d-shadow-2" alt="" />
    <img src={ds2002} id="ds-loading-d-shadow-3" alt="" />
    <img src={ds2003} id="ds-loading-d" alt="" />
    <img src={ds2003} id="ds-loading-sticky" alt="" />
  </div>
);
