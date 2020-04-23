import React from 'react';
import { HmiDataDebit } from '../../hmi-shared/HmiDataDebit/HmiDataDebit';
import { HmiRating } from '../../hmi-shared/HmiRating/HmiRating';
import { HmiBaasHeader } from '../HmiBaasHeader/HmiBaasHeader';
import { HmiBaasReadAndWrite } from '../HmiBaasReadAndWrite/HmiBaasReadAndWrite';

export const HmiBaas: React.FC = () => {

  return (
    <div>
      <HmiBaasHeader />
      <HmiBaasReadAndWrite />
      <HmiDataDebit />
      <HmiRating />
    </div>
  );
};
