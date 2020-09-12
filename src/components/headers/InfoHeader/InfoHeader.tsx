import React from 'react';
import logo from '../../../assets/icons/hat-logo-white.png';
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../features/authentication/authenticationSlice";
import { Link } from "react-router-dom";

export const InfoHeader: React.FC = () => {
  const authenticated = useSelector(selectIsAuthenticated);

  return (
    <header className={'app-header'}>
      <div className={'app-header-content flex-row-wrapper'}>
        <img className={'app-header-logo'} src={logo}  alt={'HAT Logo'}/>
        <span className={'flex-spacer-small'} />

        {!authenticated &&
            <>
              <Link className={'app-header-btn-no-border'} to={'/user/login'}>
                Sign In
              </Link>

              <a className={'app-header-btn-with-border'} href={'https://hatters.dataswift.io/hat/signup'}>
                Get a hat
              </a>

              <button className={'app-header-btn-help'}>
                <i className={'material-icons'}>help_outline</i>
              </button>
            </>
        }

        {authenticated &&
        <>
          <div className={'text-medium'}>What can I do with my HAT?</div>
          <a className={'app-header-learn-more'}
            href={'https://hubofallthings.com'}
            rel={'noopener noreferrer'}
            target={'_blank'}
          >
            Learn More
          </a>
        </>
        }
      </div>
    </header>
  );
};
