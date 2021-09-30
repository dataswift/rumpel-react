import React from 'react';

const ProfileDefaultAvatar: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xlinkHref="http://www.w3.org/1999/xlink"
    width="100"
    height="100"
    viewBox="0 0 100 100"
  >
    <defs>
      <circle id="uvm5qaz04a" cx="50" cy="50" r="50" />
      <circle id="qcmxle3wmd" cx="50" cy="50" r="50" />
      <linearGradient id="ldj90raozc" x1="50%" x2="50%" y1="1.518%" y2="100%">
        <stop offset="0%" stopColor="#4A556B" />
        <stop offset="100%" stopColor="#4A556B" stopOpacity=".201" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <mask id="lpl4k0k9ab" fill="#fff">
            <use xlinkHref="#uvm5qaz04a" />
          </mask>
          <use fill="#DBDDE1" xlinkHref="#uvm5qaz04a" />
          <circle cx="50" cy="42" r="15" fill="#4A556B" mask="url(#lpl4k0k9ab)" />
          <circle cx="50" cy="89" r="30" fill="url(#ldj90raozc)" mask="url(#lpl4k0k9ab)" />
          <circle cx="50" cy="50" r="48.5" stroke="#FFF" strokeWidth="3" />
        </g>
      </g>
    </g>
  </svg>
);

export default ProfileDefaultAvatar;
