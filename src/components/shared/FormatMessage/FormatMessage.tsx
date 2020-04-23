import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessages } from '../../../features/messages/messagesSlice';

type Props = {
  id: string;
  values?: object;
};

export const FormatMessage: React.FC<Props> = props => {
  const messages = useSelector(selectMessages);

  const updateMessageValues = (message: string, values?: object): string => {
    if (values) {
      let formattedMsg = message;

      for (const [key, value] of Object.entries(values)) {
        formattedMsg = message.replace(`{${ key }}`, value);
      }

      return formattedMsg;
    }

    return message;
  };

  const { id, values } = props;
  const message = messages && messages[id];
  if (!message) {
    return null;
  }

  const formattedMsg = updateMessageValues(message, values);

  return <>{formattedMsg}</>;
};
