import React from 'react';
import './NavigationHeader.scss';

type Props = {
    toggleSideMenu: () => void;
}

export const NavigationHeader: React.FC<Props> = ({ toggleSideMenu }) => {
  return (
    <header className={'app-header'}>
      <div className={'app-header-content flex-row-wrapper'}>
        <button className={'side-menu-toggle'} onClick={ () => toggleSideMenu()}>
          <i className={'material-icons'}>menu</i>
        </button>

        <span className={'flex-spacer-small'} />

        <div className={'text-medium'}>Help</div>
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
