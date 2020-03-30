import React, { useEffect } from 'react';
import './Hmi.scss';
import { useDispatch, useSelector } from 'react-redux';
import { HmiDaas } from '../hmi-daas/HmiDaas/HmiDaas';
import { HmiBaas } from '../hmi-baas/HmiBaas/HmiBaas';
import {selectLanguage} from "../../../features/language/languageSlice";
import {HmiType} from "../../../features/hmi/hmi.interface";
import {getApplication, selectParentApp} from "../../../features/hat-login/hatLoginSlice";

type Props = {
  path?: string;
  appId: string;
  registrationType: HmiType;
};

export const Hmi: React.FC<Props> = props => {
  const parentApp = useSelector(selectParentApp);
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.appId) {
      dispatch(getApplication(props.appId, language));
    }
  }, [props.appId]);

  useEffect(() => {
    // if (parentApp && parentApp.setup.dependencies) {
    //   parentApp.setup.dependencies.forEach(appId => {
    //     dispatch(getApplicationDependency(appId));
    //   });
    // }
  }, [parentApp]);

  // const isHatApp = ['hatapp', 'hatappstaging'].indexOf(props.appId) !== -1;

  return (
    <div className={'hmi-page'}>
      <div className={'hmi-page-wrapper'}>
        {parentApp && props.registrationType === HmiType.daas && <HmiDaas />}
        {parentApp && props.registrationType === HmiType.baas && <HmiBaas />}

        {/*{!parentApp && <LoadingScreen message={'Please wait...'} />}*/}
      </div>
    </div>
  );
};
