import React, { useState } from 'react';
import logo from '../../../assets/icons/hat-logo-white.png';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../features/authentication/authenticationSlice';
import { Link } from 'react-router-dom';
import hatLogo from '../../../assets/images/hat-logo.svg';
import RumpelModal from '../../Modals/RumpelModal';

type Props = {
  fixed?: boolean;
  hideMobile?: boolean;
};

export const InfoHeader: React.FC<Props> = ({ fixed, hideMobile }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const authenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <header className={`app-header ${fixed ? 'app-header-fixed' : ''} ${hideMobile ? 'app-header-hide-mobile' : ''}`}>
        <div className={'app-header-content flex-row-wrapper'}>
          <img className={'app-header-logo'} src={logo} alt={'HAT Logo'} />
          <span className={'flex-spacer-small'} />

          <Link className={'app-header-btn-no-border'} to={authenticated ? '/feed' : '/user/login'}>
            {authenticated ? 'PDA Dashboard' : 'Sign In'}
          </Link>

          <a className={'app-header-btn-with-border'} href={'https://hatters.dataswift.io/hat/signup'}>
            Get a hat
          </a>

          <button className={'app-header-btn-help'} onClick={() => setOpenDialog(true)}>
            <i className={'material-icons'}>help_outline</i>
          </button>
        </div>
      </header>

      <RumpelModal open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="rum-modal-header">
          <div className={'rum-modal-text-title'}>What is HAT?</div>
        </div>
        <div className="rum-modal-body rum-modal-text-content">
          <div>
            <div className={'rum-modal-image-wrapper'}>
              <img src={hatLogo} alt={'HAT'} />
            </div>

            <div>
              A HAT is a micro-server data account. It can enable you to claim data from the Internet, as well as store,
              process, use, and exchange that data with others.
              <br /> <br />
              It is also a private space for creating new data through machine learning and analytics, enabling you to
              share insights about yourself.
              <br /> <br />
              It is also a private space for creating new data through machine learning and analytics, enabling you to
              share insights about yourself.
            </div>
          </div>
        </div>
        <div className="rum-modal-footer">
          <a
            onClick={() => setOpenDialog(false)}
            className={'rum-modal-btn-accent'}
            href={'https://www.hubofallthings.com/main/what-is-the-hat'}
            target={'_blank'}
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      </RumpelModal>
    </>
  );
};
