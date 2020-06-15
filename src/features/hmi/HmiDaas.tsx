import React from 'react';
import { useSelector } from "react-redux";
import { selectDependencyApps } from "./hmiSlice";
import { HmiDaasHeader } from "./HmiDaasHeader";
import { HmiBaasReadAndWrite } from "./HmiBaasReadAndWrite";
import { HmiDataPlug } from "./HmiDataPlug";
import { HmiDataDebit } from "./HmiDataDebit";
import { HmiRating } from "./HmiRating";

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
