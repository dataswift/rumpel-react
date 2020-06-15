import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../features/language/languageSlice';
import { fetchMessages } from '../features/messages/messagesSlice';

type Props = {
  children: React.ReactNode;
};

export const LanguageParamHandler: React.FC<Props> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLanguage('en'));
    dispatch(fetchMessages());
  }, [dispatch]);

  return <>{props.children}</>;
};
