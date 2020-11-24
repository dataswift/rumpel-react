import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import TileHeader from '../../components/headers/TileHeader/TileHeader';
import ApplicationList from './ApplicationList';
import { getApplications, selectApplicationsByKind } from './applicationsSlice';

const HATApplications: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const apps = useSelector(selectApplicationsByKind('App'));

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const onAppClick = (appId: string) => {
    history.push(`/explore/App/${appId}`);
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
