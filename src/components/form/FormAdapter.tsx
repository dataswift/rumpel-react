import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormFields } from './formFields.interface';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import DatePickerRumpel from '../DatePickerRumpel/DatePickerRumpel';
import Input from './Input';
import { useFormValidations } from './useFormValidations';
import { ProfileSharingConfig } from '../../features/profile/profile.interface';
import { setProfileSharingConfigKey } from '../../features/profile/profileSlice';

const debounce = require('lodash.debounce');

type Props = {
  fields: Array<FormFields>;
  values: Record<string, string>;
  validations: Record<string, string>;
  profileField?: boolean;
  formId: string;
  profileSharing?: ProfileSharingConfig;
  onFormDataChange?: (key: string, data: Record<string, string>) => void;
};

const FormAdapter: React.FC<Props> = (props) => {
  const { fields, profileField, formId, validations, values, onFormDataChange, profileSharing } =
    props;
  const dispatch = useDispatch();

  const [formState, setFormState] = useState<Record<string, string>>(values);
  const [previousState, setPreviousState] = useState<Record<string, string>>(values);
  const { errors } = useFormValidations(validations, formState);
  const onFormStateDebounce = useRef(
    debounce((key: string, data: Record<string, string>) => onFormDataChange?.(key, data), 1000),
  ).current;

  useEffect(() => {
    setFormState(values);
    setPreviousState(values);
  }, [values]);

  const onChange = (fieldId: string, value: string) => {
    setFormState({ ...formState, [fieldId]: value });
  };

  const onProfileSharingChange = (key: string, id: string) => {
    dispatch(setProfileSharingConfigKey(key, id));
  };

  useEffect(() => {
    if (previousState !== formState) {
      onFormStateDebounce(formId, formState);
    }
  }, [formId, previousState, formState, onFormStateDebounce]);

  const elements = fields.map((field) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <Input
            key={field.id}
            label={field.placeholder}
            id={field.id}
            type={field.type}
            errorMessage={errors[field.id]}
            profileField={profileField}
            value={formState[field.id] || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            profilePrivacyToggle={profileSharing?.[formId]?.[field.id]}
            onProfileSharingChange={() => onProfileSharingChange(formId, field.id)}
          />
        );
      case 'menu':
        return (
          <DropDownMenu
            value={formState[field.id]}
            placeholder={field.placeholder}
            options={field.options || []}
            errorMessage={errors[field.id]}
            profileField={profileField}
            onChange={(option) => onChange(field.id, option)}
            key={field.id}
            profilePrivacyToggle={profileSharing?.[formId]?.[field.id]}
            onProfileSharingChange={() => onProfileSharingChange(formId, field.id)}
          />
        );
      case 'DatePicker':
        return (
          <DatePickerRumpel
            value={formState[field.id]}
            key={field.id}
            profileField={profileField}
            errorMessage={errors[field.id]}
            onChange={(date) => onChange(field.id, date)}
            label={field.placeholder}
            profilePrivacyToggle={profileSharing?.[formId]?.[field.id]}
            onProfileSharingChange={() => onProfileSharingChange(formId, field.id)}
          />
        );
      default:
        return null;
    }
  });

  return <>{elements}</>;
};

export default FormAdapter;
