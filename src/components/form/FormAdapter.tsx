import React, { useEffect, useState } from "react";
import { FormFields } from "./formFields.interface";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import DatePickerRumpel from "../DatePickerRumpel/DatePickerRumpel";
import Input from "./Input";
import { useFormValidations } from "./useFormValidations";

type Props = {
  fields: Array<FormFields>;
  values: Record<string, string>;
  validations: Record<string, string>;
  profileField?: boolean;
}

const FormAdapter: React.FC<Props> = ({ fields,profileField, validations, values }) => {
  const [formState, setFormState] = useState<Record<string, string>>(values);
  const { errors } = useFormValidations(validations, formState);

  useEffect(() => {
    setFormState(values);
  }, [values]);

  const onChange = (fieldId: string, value: string) => {
    setFormState({ ...formState, [fieldId]: value });
  };

  const elements = fields.map(field => {
    switch (field.type) {
      case 'text':
      case 'email':
        return <Input
          key={field.id}
          label={field.placeholder}
          id={field.id}
          type={field.type}
          errorMessage={errors[field.id]}
          profileField={profileField}
          value={formState[field.id] || ''}
          onChange={e => onChange(field.id, e.target.value)}
        />;
      case 'menu':
        return <DropDownMenu 
          value={formState[field.id]}
          placeholder={field.placeholder} 
          options={field.options || []}
          errorMessage={errors[field.id]}
          profileField={profileField}
          onChange={option => onChange(field.id, option)}
          key={field.id}
        />;
      case 'DatePicker':
        return <DatePickerRumpel 
          value={formState[field.id]}
          key={field.id}
          profileField={profileField}
          errorMessage={errors[field.id]}
          onChange={date => onChange(field.id, date)}
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
