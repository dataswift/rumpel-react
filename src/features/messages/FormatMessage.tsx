import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessages } from "./messagesSlice";

type Props = {
  id: string;
  asHtml?: boolean;
  values?: object;
};

export const FormatMessage: React.FC<Props> = props => {
  const messages = useSelector(selectMessages);

  const updateMessageValues = (message: string, values?: object): string => {
    if (values) {
      let formattedMsg = message;

      for (const [key, value] of Object.entries(values)) {
        formattedMsg = formattedMsg.replace(`{${ key }}`, value);
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

  if (props.asHtml) {
    return <div dangerouslySetInnerHTML={{ __html: formattedMsg }} />;
  } else {
    return <>{formattedMsg}</>;
  }
};

export default FormatMessage;
