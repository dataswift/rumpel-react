import React from 'react';
import { useDispatch } from 'react-redux';
// import { RegistrationType } from '../../../registration.interface';
import { HmiActions } from '../../hmi-shared/HmiActions/HmiActions';
// import { setRedirectError } from '../../../../../features/redirectError/redirectErrorSlice';
// import { incrementBaasStep } from '../../../../../features/baasSignup/baasSignupSlice';
import { HmiDataDebit } from '../../hmi-shared/HmiDataDebit/HmiDataDebit';
import { HmiRating } from '../../hmi-shared/HmiRating/HmiRating';
import { HmiBaasHeader } from '../HmiBaasHeader/HmiBaasHeader';
import { HmiBaasReadAndWrite } from '../HmiBaasReadAndWrite/HmiBaasReadAndWrite';
import {HmiType} from "../../../../features/hmi/hmi.interface";

export const HmiBaas: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <HmiBaasHeader />
      <HmiBaasReadAndWrite />
      <HmiDataDebit />
      <HmiRating />
      <HmiActions
        registrationType={HmiType.baas}
        cancelStep={() =>
          {}
        }
        nextStep={() => {}}
      />
    </div>
  );
};
