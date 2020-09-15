import React, { useEffect, useState } from "react";
import './PublicProfile.scss';
import { InfoHeader } from "../../components/headers/InfoHeader/InfoHeader";
import { useDispatch, useSelector } from "react-redux";
import { getPublicProfileReq, selectPublicProfile } from "./publicProfileSlice";
import blogIcon from '../../assets/icons/blog-icon.svg';
import facebookIcon from '../../assets/icons/facebook-grey-icon.svg';
import googleIcon from '../../assets/icons/google-icon.svg';
import linkedinIcon from '../../assets/icons/linkedin-icon.svg';
import twitterIcon from '../../assets/icons/twitter-grey-icon.svg';
import websiteIcon from '../../assets/icons/website-icon.svg';
import youtubeIcon from '../../assets/icons/youtube-icon.svg';


const icons: {[index: string]: string} = {
  blog: blogIcon,
  facebook: facebookIcon,
  google: googleIcon,
  linkedin: linkedinIcon,
  twitter: twitterIcon,
  website: websiteIcon,
  youtube: youtubeIcon
};
export const PublicProfile: React.FC = () => {
  const [hatName, setHatName] = useState("");
  const [hatDomain, setHatDomain] = useState("");
  const profile = useSelector(selectPublicProfile);
  const dispatch = useDispatch();


  const DefaultAvatar = <svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="100" height="100" viewBox="0 0 100 100">
    <defs>
      <circle id="uvm5qaz04a" cx="50" cy="50" r="50"/>
      <circle id="qcmxle3wmd" cx="50" cy="50" r="50"/>
      <linearGradient id="ldj90raozc" x1="50%" x2="50%" y1="1.518%" y2="100%">
        <stop offset="0%" stopColor="#4A556B"/>
        <stop offset="100%" stopColor="#4A556B" stopOpacity=".201"/>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <mask id="lpl4k0k9ab" fill="#fff">
            <use xlinkHref="#uvm5qaz04a"/>
          </mask>
          <use fill="#DBDDE1" xlinkHref="#uvm5qaz04a"/>
          <circle cx="50" cy="42" r="15" fill="#4A556B" mask="url(#lpl4k0k9ab)"/>
          <circle cx="50" cy="89" r="30" fill="url(#ldj90raozc)" mask="url(#lpl4k0k9ab)"/>
          <circle cx="50" cy="50" r="48.5" stroke="#FFF" strokeWidth="3"/>
        </g>
      </g>
    </g>
  </svg>;

  const getPublicName = () => {
    if (!profile) return '';

    let name = '';

    if (profile.personal.title) {
      name += `${ profile.personal.title } `;
    }

    if (profile.personal.firstName) {
      name += `${ profile.personal.firstName } `;
    }

    if (profile.personal.nickName) {
      name += `${ profile.personal.nickName } `;
    }


    if (profile.personal.lastName) {
      name += `${ profile.personal.lastName }`;
    }

    return name;
  };

  useEffect(() => {
    const host = window.location.hostname;

    setHatName(host.substring(0, host.indexOf('.')));
    setHatDomain(host.substring(host.indexOf('.') + 1));
    dispatch(getPublicProfileReq());
  }, [dispatch]);

  return (
    <>
      <div className={'public-profile'}>
        <InfoHeader />

        <div className={'public-profile-box'}>
          <div className={'public-profile-photo-container'}>
            {!profile?.photo && DefaultAvatar}

            {profile?.photo.avatar && <img src={profile.photo.avatar} alt={'avatar'} /> }

          </div>
          <div className={'public-profile-of'}>
              Public profile of
          </div>

          <div className="public-profile-hat-domain-wrapper">
            <div className="hat-name">
              {hatName}
            </div>

            <div className="hat-domain">
              .{hatDomain}
            </div>
          </div>

          <p>
            {profile?.online &&
              <span className={'public-profile-social-links'}>
                {Object.entries(profile.online).map(([key, value], index) => {
                  return <a href={value} target={'_blank'} rel="noopener noreferrer" key={key + index}>
                    <img src={icons[key]} alt={`${ key } link to ${ value }`}/>
                  </a>;
                })}
              </span>
            }

            {(!profile || !(profile?.online && profile.contact && profile.about)) &&
                <span>
                  This user has no public information
                </span>
            }
          </p>
          {profile?.personal &&
                <div className={'public-profile-details'}>
                  <div className={'public-profile-details-header'}>Personal Details</div>
                  <div className={'public-profile-details-content'}>
                    {profile.personal.firstName &&
                    <div>{getPublicName()}</div>
                    }
                    {profile.personal.gender && <div>{profile.personal.gender}</div>}
                    {profile.personal.ageGroup && <div>{profile.personal.ageGroup}</div>}
                    {profile.personal.birthDate && <div>{profile.personal.birthDate}</div>}
                  </div>
                </div>
          }

          {profile?.contact &&
            <div className={'public-profile-details'}>
              <div className={'public-profile-details-header'}>Contact Details</div>
              <div className={'public-profile-details-content'}>
                {profile.contact.primaryEmail && <div>{profile.contact.primaryEmail}</div>}
                {profile.contact.alternativeEmail && <div>{profile.contact.alternativeEmail}</div>}
                {profile.contact.mobile && <div>{profile.contact.mobile}</div>}
                {profile.contact.landline && <div>{profile.contact.landline}</div>}
              </div>
            </div>
          }

          {profile?.about &&
          <div className={'public-profile-details'}>
            <div className={'public-profile-details-header'}>About</div>
            <div className={'public-profile-details-content'}>
              {profile.about.title && <div>{profile.about.title}</div>}
              {profile.about.body && <div>{profile.about.body}</div>}
            </div>
          </div>
          }
        </div>

        <div className={'public-profile-footer'}>
          <i className="material-icons">lock_outline</i>All data is secure and private
        </div>
      </div>
    </>
  );
};
