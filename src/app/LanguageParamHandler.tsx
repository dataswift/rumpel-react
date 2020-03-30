import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage } from '../features/language/languageSlice';
import { fetchMessages } from '../features/messages/messagesSlice';

type Props = {
  children: React.ReactNode;
};

export const LanguageParamHandler: React.FC<Props> = props => {
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLanguage("en"));
    dispatch(fetchMessages("en"));
  }, []);

  return <>{props.children}</>;
};
