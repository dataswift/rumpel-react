import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import DetailsHeader from '../../components/headers/DetailsHeader/DetailsHeader';
import FormatMessage from '../messages/FormatMessage';
import { getApplicationById, selectApplicationById } from './applicationsSlice';
import './HatApplication.scss';
import { getStatusIcon, getAppStatus } from './helper';

const AppDetailsToolbarActions = () => <i className="material-icons details-close">more_horiz</i>;

const HatApplicationDetails: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { appId } = useParams<{ appId: string }>();
  const app = useSelector(selectApplicationById(appId));

  useEffect(() => {
    if (!app) dispatch(getApplicationById(appId));
  }, [dispatch, app, appId]);

  if (!app) return null;

  const onAppStatusClick = () => {
    const { id, setup } = app.application;
    const redirectRumpel = window.location.href;
    const redirectUrl = setup.url || setup.iosUrl || '';

    history.push(
      `/auth/oauth?` +
        `application_id=${id}&fallback=${redirectRumpel}&redirect_uri=${redirectUrl}%3Fredirect=${redirectRumpel}`,
    );
  };

  return (
    <DetailsHeader
      logoSrc={app.application.info.graphics.logo.normal}
      logoAltText="HAT Application Logo"
      toolbarActions={<AppDetailsToolbarActions />}
      backgroundColor="#2b313d"
    >
      <div className="app-rating-wrapper">
        <div className="app-rating">
          <span className="app-rating-highlighted">{app.application.info.rating.score}</span>
        </div>
      </div>

      <h3 className="app-details-header-title">{app.application.info.name}</h3>
      <div className="app-details-header-headline">
        <FormatMessage id="ds.hat.application.details.rated" /> {app.application.info.rating.score}
      </div>

      <a href="https://resources.dataswift.io/contents/4a9f5153-7d52-4b79-8eb1-e570aa331291" className="app-link">
        <FormatMessage id="ds.hat.application.details.learn" />
      </a>

      <div onClick={onAppStatusClick} className={`app-details-status ${getAppStatus(app)} link-button`}>
        <i className="material-icons details-button-icon">{getStatusIcon(app)}</i>
        Connect
      </div>
    </DetailsHeader>
  );
};

export default HatApplicationDetails;
