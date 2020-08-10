import React from 'react';
import logo from '../../../assets/icons/hat-logo-white.png';

export const InfoHeader: React.FC = () => {
  return (
    <header className={'app-header app-header-hide-small'}>
      <div className={'app-header-content flex-row-wrapper'}>
        <img className={'app-header-logo'} src={logo}  alt={'HAT Logo'}/>
        <span className={'flex-spacer-small'} />

        <div className={'text-medium'}>What can I do with my HAT?</div>
        <a className={'app-header-learn-more'}
          href={'https://hubofallthings.com'}
          rel={'noopener noreferrer'}
          target={'_blank'}
        >
          Learn More
        </a>
      </div>
    </header>
  );
};
