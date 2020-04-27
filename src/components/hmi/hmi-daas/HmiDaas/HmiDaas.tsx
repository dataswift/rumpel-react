import React from 'react';
import './HmiDaas.scss';
import { HmiDaasHeader } from '../HmiDaasHeader/HmiDaasHeader';
import { HmiDataDebit } from '../../hmi-shared/HmiDataDebit/HmiDataDebit';
import { HmiRating } from '../../hmi-shared/HmiRating/HmiRating';
import { HmiDataPlug } from '../../hmi-shared/HmiDataPlug/HmiDataPlug';
import {useSelector} from "react-redux";
import {selectDependencyApps} from "../../../../features/hat-login/hatLoginSlice";
import {HmiBaasReadAndWrite} from "../../hmi-baas/HmiBaasReadAndWrite/HmiBaasReadAndWrite";

export const HmiDaas: React.FC = () => {
  const dependencyApps = useSelector(selectDependencyApps);

  return (
    <>
      <HmiDaasHeader />
      {dependencyApps.length === 0 ? (
        <HmiBaasReadAndWrite />
      ): (
        <HmiDataPlug />
      )
      }
      <HmiDataDebit />
      <HmiRating />
    </>
  );
};
