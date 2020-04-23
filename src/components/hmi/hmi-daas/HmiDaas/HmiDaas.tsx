import React from 'react';
import './HmiDaas.scss';
import { HmiDaasHeader } from '../HmiDaasHeader/HmiDaasHeader';
import { HmiDataDebit } from '../../hmi-shared/HmiDataDebit/HmiDataDebit';
import { HmiRating } from '../../hmi-shared/HmiRating/HmiRating';
import { HmiDataPlug } from '../../hmi-shared/HmiDataPlug/HmiDataPlug';

export const HmiDaas: React.FC = () => {

  return (
    <>
      <HmiDaasHeader />
      <HmiDataPlug />
      <HmiDataDebit />
      <HmiRating />
    </>
  );
};
