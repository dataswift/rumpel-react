import React, { useEffect, useState } from "react";
import { FormFields } from "./formFields.interface";

type Props = {
  fields: Array<FormFields>;
  values: Record<string, string>;
}

const FormAdapter: React.FC<Props> = ({ fields, values }) => {
  const [formState, setFormState] = useState<Record<string, string>>(values);

  console.log(formState);
  useEffect(() => {
    setFormState(values);
  }, [values]);

  const elements = fields.map(field => {
    switch (field.type) {
      case 'text':
      case 'email':
        return <input 
          {...field} 
          key={field.id}
          value={formState ? formState[field.id] : ''}
          onChange={e => setFormState( { ...formState, [field.id]: e.target.value })}
        />;
      case 'menu':
        return <input {...field} key={field.id}/>;
      case 'DatePicker':
        return <input {...field} key={field.id}/>;
      default:
        return null;
    }
  });

  useEffect(() => console.log(formState), [formState]);

  return (
    <>
      {elements}
    </>
  );
};

export default FormAdapter;
