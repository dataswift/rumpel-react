import React from 'react';
import './Hmi.scss';
import { useSelector } from "react-redux";
import { HmiType } from "./hmi.interface";
import { selectParentApp } from "./hmiSlice";
import { HmiDaas } from "./HmiDaas";
import { HmiBaas } from "./HmiBaas";

type Props = {
  path?: string;
  hmiType: HmiType;
};

export const Hmi: React.FC<Props> = props => {
  const parentApp = useSelector(selectParentApp);

  return (
    <div className={'hmi-page'}>
      <div className={'hmi-page-wrapper'}>
        {parentApp && props.hmiType === HmiType.daas && <HmiDaas />}
        {parentApp && props.hmiType === HmiType.baas && <HmiBaas />}
      </div>
    </div>
  );
};
