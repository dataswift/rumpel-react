import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import TileHeader from '../../components/headers/TileHeader/TileHeader';
import ApplicationList from './ApplicationList';
import { getApplications, selectApplications } from './applicationsSlice';

const HATApplications: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const apps = useSelector(selectApplications);

  React.useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const onAppClick = (appId: string) => {
    history.push(`/applications/${appId}`);
  };

  return (
    <>
      <TileHeader
        titleId="ds.hat.applications.header.title"
        icon="touch_app"
        descriptionId="ds.hat.applications.header.description"
      />
      <ApplicationList hatApps={apps} onAppClick={onAppClick} />
    </>
  );
};

export default HATApplications;
