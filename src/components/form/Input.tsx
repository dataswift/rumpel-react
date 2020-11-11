import React, { useEffect, useState } from "react";
import './Input.scss';

type OwnProps = {
  label: string;
  id: string;
  type: string;
  hidden?: boolean;
  value?: string;
  key?: string;
  errorMessage?: string;
  profileField?: boolean;
  profilePrivacyToggle?: boolean;
  onProfileSharingChange?: () => void;
};

type Props = OwnProps &
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
        >;

const Input: React.FC<Props> = (props) => {
  const {
    label,
    id,
    type,
    errorMessage,
    profileField,
    value,
    profilePrivacyToggle,
    onProfileSharingChange,
    ...rest
  } = props;
  const [onInputFocus, setOnInputFocus] = useState('');
  const [onFilled, setOnFilled] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const onBlur = (value: string) => {
    if (value) {
      setOnFilled('filled');
    } else {
      setOnFilled('');
      setOnInputFocus('');
    }
  };

  useEffect(() => {
    if (value) {
      setOnFilled('filled');
      setOnInputFocus('focused');
    }
  }, [value]);

  useEffect(() => {
    if (profilePrivacyToggle === undefined) return;

    setPrivacy(profilePrivacyToggle);
  }, [profilePrivacyToggle]);

  return (
    <div className={`form-group ${onInputFocus}`}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <input id={id}
        className={`form-input ${onFilled}`} 
        type={type}
        value={value}
        onFocus={() => setOnInputFocus('focused')}
        onBlur={(e) => onBlur(e.target.value)}
        {...rest}
      />
      {profileField && (
        <button className={'form-input-profile-toggle'} 
          type={'button'}
          onClick={() => onProfileSharingChange?.()}
        >
          {privacy ? 'Public' : 'Private'}
        </button>
      )
      }
      {errorMessage && <div className={'form-input-error-message'}>{errorMessage}</div>}
    </div>
  );
};
export default Input;
