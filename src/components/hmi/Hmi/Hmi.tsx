import React from 'react';
import './Hmi.scss';
import { useSelector } from 'react-redux';
import { HmiDaas } from '../hmi-daas/HmiDaas/HmiDaas';
import { HmiBaas } from '../hmi-baas/HmiBaas/HmiBaas';
import { HmiType } from '../../../features/hmi/hmi.interface';
import { selectParentApp } from '../../../features/hat-login/hatLoginSlice';

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
