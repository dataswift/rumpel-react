import React from 'react';
import './HmiDaas.scss';
import { HmiDaasHeader } from '../HmiDaasHeader/HmiDaasHeader';
import { HmiActions } from '../../hmi-shared/HmiActions/HmiActions';
import { useDispatch, useSelector } from 'react-redux';
import { HmiDataDebit } from '../../hmi-shared/HmiDataDebit/HmiDataDebit';
import { HmiRating } from '../../hmi-shared/HmiRating/HmiRating';
import { HmiDataPlug } from '../../hmi-shared/HmiDataPlug/HmiDataPlug';
import {HmiType} from "../../../../features/hmi/hmi.interface";

export const HmiDaas: React.FC = () => {
  // const signup = useSelector(selectDaasSignup);
  const dispatch = useDispatch();

  return (
    <>
      <HmiDaasHeader />
      <HmiDataPlug />
      <HmiDataDebit />
      <HmiRating />
      <HmiActions
        registrationType={HmiType.daas}
        nextStep={() => {}}
        cancelStep={() => {}}
      />
    </>
  );
};
