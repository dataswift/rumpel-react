import React from 'react';
import { HmiBaasHeader } from "./HmiBaasHeader";
import { HmiBaasReadAndWrite } from "./HmiBaasReadAndWrite";
import { HmiRating } from "./HmiRating";
import { HmiDataDebit } from "./HmiDataDebit";

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
