import React from 'react';
import logo from '../../../assets/icons/hat-logo-white.png';

export const NavigationHeader: React.FC = () => {
    return (
        <header className={'app-header'}>
            <div className={'app-header-content flex-row-wrapper'}>
                <img className={'app-header-logo'} src={logo}  alt={'HAT Logo'}/>
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
