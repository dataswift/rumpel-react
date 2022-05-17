import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import format from 'date-fns/format';

import DetailsHeader from '../../components/headers/DetailsHeader/DetailsHeader';
import FormatMessage from '../messages/FormatMessage';
import '../applications/HatApplication.scss';
import InformationDetails from '../../components/InformationDetails/InformationDetails';
import { getApplicationById, selectApplicationById } from "../applications/applicationsSlice";
import AppDetailsToolbarActions from "../applications/ApplicationDetailsActions";
import { getAppStatus, getStatusButtonText, getStatusIcon, HatApplicationStatus } from "../applications/helper";
import { Facebook } from 'react-feather';

const DataPlugDetails: React.FC = () => {
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

  const getApplicationDetails = (): Array<{ [key: string]: string }> => {
    const { name, url, country } = app.application.developer;
    const { version, termsUrl, supportContact } = app.application.info;

    return [
      { provider: name },
      { website: url },
      { country: country },
      { version: version },
      { 'last updated': format(new Date(app.application.status.versionReleaseDate || ''), 'dd/MM/yyyy') },
      { 'terms and conditions': termsUrl },
      { 'support email': supportContact },
    ];
  };

  const getApplicationStatus = () => getAppStatus(app);

  return (
    <>
      <DetailsHeader
        logoSrc={app.application.info.graphics.logo.normal}
        logoAltText="Data Plug Logo"
        toolbarActions={<AppDetailsToolbarActions setup={app.setup} appId={app.application.id} />}
        backgroundColor={app.application.info.primaryColor}
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

        <a href="https://docs.dataswift.io/deploy/rating-assurance-and-certification" className="app-link">
          <FormatMessage id="ds.hat.application.details.learn" />
        </a>

        <div onClick={onAppStatusClick} className={`app-details-status ${getApplicationStatus()} link-button`}>
          {appId.includes("facebook") && getApplicationStatus() === HatApplicationStatus.UNTOUCHED &&
            <Facebook className="details-button-icon" />
          }
          {!(appId.includes("facebook") && getApplicationStatus() === HatApplicationStatus.UNTOUCHED) &&
            <i className="material-icons details-button-icon">{getStatusIcon(app)}</i>
          }
          {getStatusButtonText(app)}
        </div>
      </DetailsHeader>
      <InformationDetails
        header={'Data Plug Info'}
        description={app.application.info.description.text}
        screenshots={app.application.info.graphics.screenshots.map((screenshot) => screenshot.normal)}
        informationListData={getApplicationDetails()}
      />
    </>
  );
};

export default DataPlugDetails;
