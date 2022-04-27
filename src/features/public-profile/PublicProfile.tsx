import React, { useEffect, useState } from 'react';
import './PublicProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { InfoHeader } from '../../components/headers/InfoHeader/InfoHeader';
import {
  getPublicProfileReq,
  selectPublicProfile,
  selectPublicProfilePending,
} from './publicProfileSlice';
import blogIcon from '../../assets/icons/blog-icon.svg';
import facebookIcon from '../../assets/icons/facebook-grey-icon.svg';
import googleIcon from '../../assets/icons/google-icon.svg';
import linkedinIcon from '../../assets/icons/linkedin-icon.svg';
import twitterIcon from '../../assets/icons/twitter-grey-icon.svg';
import websiteIcon from '../../assets/icons/website-icon.svg';
import youtubeIcon from '../../assets/icons/youtube-icon.svg';
import ProfileDefaultAvatar from '../../components/Svgs/ProfileDefaultAvatar';
import { useDataswiftNotification } from '../../utils/customHooks';

const icons: { [index: string]: string } = {
  blog: blogIcon,
  facebook: facebookIcon,
  google: googleIcon,
  linkedin: linkedinIcon,
  twitter: twitterIcon,
  website: websiteIcon,
  youtube: youtubeIcon,
};

export const PublicProfile: React.FC = () => {
  const [hatName, setHatName] = useState('');
  const [hatDomain, setHatDomain] = useState('');
  const profile = useSelector(selectPublicProfile);
  const pendingRequest = useSelector(selectPublicProfilePending);
  const dispatch = useDispatch();
  const ribbon = useDataswiftNotification(true);

  const getPublicName = () => {
    if (!profile) return '';

    let name = '';

    if (profile.personal.title) {
      name += `${profile.personal.title} `;
    }

    if (profile.personal.firstName) {
      name += `${profile.personal.firstName} `;
    }

    if (profile.personal.nickName) {
      name += `${profile.personal.nickName} `;
    }

    if (profile.personal.lastName) {
      name += `${profile.personal.lastName}`;
    }

    return name;
  };

  useEffect(() => {
    const host = window.location.hostname;

    setHatName(host.substring(0, host.indexOf('.')));
    setHatDomain(host.substring(host.indexOf('.') + 1));
    dispatch(getPublicProfileReq());
  }, [dispatch]);

  if (pendingRequest) {
    return null;
  }

  return (
    <>
      <div className="public-profile">
        <InfoHeader />
        {ribbon}

        <div className="public-profile-box">
          <div className="public-profile-photo-container">
            {profile?.photo?.avatar ? (
              <img src={profile.photo.avatar} alt="Profile avatar" />
            ) : (
              <ProfileDefaultAvatar />
            )}
          </div>
          <div className="public-profile-of">Public profile of</div>

          <div className="public-profile-hat-domain-wrapper">
            <div className="hat-name">{hatName}</div>

            <div className="hat-domain">.{hatDomain}</div>
          </div>

          <p>
            {profile?.online && (
              <span className="public-profile-social-links">
                {Object.entries(profile.online).map(([key, value], index) => (
                  <a href={value} target="_blank" rel="noopener noreferrer" key={key + index}>
                    <img src={icons[key]} alt={`${key} link to ${value}`} />
                  </a>
                ))}
              </span>
            )}

            {(!profile ||
              (!profile?.personal && !profile?.online && !profile.contact && !profile.about)) && (
              <span>This user has no public information</span>
            )}
          </p>
          {profile?.personal && (
            <div className="public-profile-details">
              <div className="public-profile-details-header">Personal Details</div>
              <div className="public-profile-details-content">
                {profile.personal.firstName && <div>{getPublicName()}</div>}
                {profile.personal.gender && <div>{profile.personal.gender}</div>}
                {profile.personal.ageGroup && <div>{profile.personal.ageGroup}</div>}
                {profile.personal.birthDate && <div>{profile.personal.birthDate}</div>}
              </div>
            </div>
          )}

          {profile?.contact && (
            <div className="public-profile-details">
              <div className="public-profile-details-header">Contact Details</div>
              <div className="public-profile-details-content">
                {profile.contact.primaryEmail && <div>{profile.contact.primaryEmail}</div>}
                {profile.contact.alternativeEmail && <div>{profile.contact.alternativeEmail}</div>}
                {profile.contact.mobile && <div>{profile.contact.mobile}</div>}
                {profile.contact.landline && <div>{profile.contact.landline}</div>}
              </div>
            </div>
          )}

          {profile?.about && (
            <div className="public-profile-details">
              <div className="public-profile-details-header">About</div>
              <div className="public-profile-details-content">
                {profile.about.title && <div>{profile.about.title}</div>}
                {profile.about.body && <div>{profile.about.body}</div>}
              </div>
            </div>
          )}
        </div>

        <div className="public-profile-footer">
          <i className="material-icons">lock_outline</i>All data is secure and private
        </div>
      </div>
    </>
  );
};
