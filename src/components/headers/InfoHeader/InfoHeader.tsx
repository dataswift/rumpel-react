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
          <div className={'rum-modal-text-title'}>What is a HAT Personal Data Account (PDA)?</div>
        </div>
        <div className="rum-modal-body rum-modal-text-content">
          <div>
            <div className={'rum-modal-image-wrapper'}>
              <img src={hatLogo} alt={'HAT'} />
            </div>

            <div>
              A HAT Personal Data Account is the equivalent of a bank account, but for data.
              <br /> <br />
              With the HAT PDA, a HAT owner can give the data they own to websites and mobile applications in return for
              services and benefits, at the touch of a few buttons.
              <br /> <br />
              The HAT PDA also replaces the need for user accounts on mobile apps and websites. It is already referenced
              globally as a best in class solution on the Internet for individual data ownership and rights.
              <br /> <br />
              The HAT Personal Data Account technology is more than just a centralised bank account technology. It is a
              decentralised private microserver for creating new data through machine learning and analytics.
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
