import React, { useEffect } from 'react';
import { useQuery } from '../../../hooks/useQuery';
import { Hmi } from '../../hmi/Hmi/Hmi';
import { HmiType } from '../../../features/hmi/hmi.interface';
import { getApplications, selectParentApp, setupApplication } from '../../../features/hat-login/hatLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateNotes } from '../../shared/UpdateNotes/UpdateNotes';
import { HmiActions } from '../../hmi/hmi-shared/HmiActions/HmiActions';

const HatSetupLogin: React.FC = () => {
  const dispatch = useDispatch();
  const parentApp = useSelector(selectParentApp);
  const query = useQuery();
  const name = query.get('name')?.toLowerCase();
  const redirect = query.get('redirect')?.toLowerCase();
  const fallback = query.get('fallback')?.toLowerCase();

  useEffect(() => {
    dispatch(getApplications(name || 'hatapp'));
  }, []);

  const onTermsAgreed = () => {
    dispatch(setupApplication(name || 'hatapp'));
  };

  const onTermsRejected = () => {
    // dispatch(setupApplication(name || "hatapp"));
    window.location.href = fallback || '';
  };

  useEffect(() => {
    if (parentApp && parentApp.enabled && !parentApp.needsUpdating) {
      // window.location.href = redirect || '';
    } else {
      // window.location.href = fallback || '';
    }
    console.log(parentApp);
  }, [parentApp]);

  return (
    <div>
      {parentApp && <Hmi hmiType={HmiType.daas} />}
      <HmiActions
        registrationType={HmiType.daas}
        nextStep={() => onTermsAgreed()}
        cancelStep={() => onTermsRejected()}
      />
    </div>
  );
};

export default HatSetupLogin;
