import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../features/language/languageSlice';
import { fetchMessages } from '../features/messages/messagesSlice';
import * as queryString from "query-string";
import { config } from "../app.config";

type Props = {
  children: React.ReactNode;
};

type Query = {
  lang?: string;
}

export const LanguageParamHandler: React.FC<Props> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { lang } = queryString.parse(window.location.search) as Query;
    const isValid = config.acceptedLanguages.indexOf(lang ? lang : config.defaultLanguage) !== -1;
    const language = isValid && lang ? lang : config.defaultLanguage;

    dispatch(setLanguage(language));
    dispatch(fetchMessages());
  }, [dispatch]);

  return <>{props.children}</>;
};
