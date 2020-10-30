import React, { useEffect, useState } from "react";
import { FormFields } from "./formFields.interface";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import DatePickerRumpel from "../DatePickerRumpel/DatePickerRumpel";
import Input from "./Input";

type Props = {
  fields: Array<FormFields>;
  values: Record<string, string>;
  profileField?: boolean;
}

const FormAdapter: React.FC<Props> = ({ fields,profileField, values }) => {
  const [formState, setFormState] = useState<Record<string, string>>(values);

  useEffect(() => {
    setFormState(values);
  }, [values]);

  const elements = fields.map(field => {
    switch (field.type) {
      case 'text':
      case 'email':
        return <Input
          key={field.id}
          label={field.placeholder}
          id={field.id}
          type={field.type}
          profileField={profileField}
          value={formState ? formState[field.id] : ''}
          onChange={e => setFormState( { ...formState, [field.id]: e.target.value })}
        />;
      case 'menu':
        return <DropDownMenu 
          value={formState ? formState[field.id] : ''} 
          placeholder={field.placeholder} 
          options={field.options || []}
          profileField={profileField}
          key={field.id}
        />;
      case 'DatePicker':
        return <DatePickerRumpel 
          value={formState ? formState[field.id] : ''} 
          key={field.id}
          profileField={profileField}
          label={field.placeholder}
        />;
      default:
        return null;
    }
  });

  return (
    <>
      {elements}
    </>
  );
};

export default FormAdapter;
