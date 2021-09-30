import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { changePassword } from '../../../api/hatAPI';
import {
  selectUserHatName,
  selectUserHatDomain,
} from '../../../features/authentication/authenticationSlice';

import FormatMessage from '../../../features/messages/FormatMessage';
import { selectMessages } from '../../../features/messages/messagesSlice';
import { loadDynamicZxcvbn } from '../../../utils/load-dynamic-zxcvbn';
import { PasswordStrengthMeter } from '../../PasswordStrengthMeter/PasswordStrengthMeter';
import './ChangePassword.scss';

declare const zxcvbn: (pass: string) => { score: number };

const MIN_PASSWORD_STRENGTH = 3;

type ChangePasswordProps = {
  passwordStrength: (password: string) => { score: number };
};

type PassMessage = {
  error?: string;
  success?: string;
};

export const ChangePassword: React.FC<ChangePasswordProps> = ({ passwordStrength }) => {
  const messages = useSelector(selectMessages);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localMessages, setLocalMessages] = useState<PassMessage>({});
  const userHatName = useSelector(selectUserHatName);
  const userHatDomain = useSelector(selectUserHatDomain);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(passwordStrength(newPassword).score);
  }, [newPassword, passwordStrength]);

  const onChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setLocalMessages({ error: messages['ds.auth.passwordIndicator.passwordsDoNotMatch'] });
      return;
    }

    if (score < MIN_PASSWORD_STRENGTH) {
      setLocalMessages({ error: messages['ds.auth.passwordIndicator.passwordMustBeStronger'] });
      return;
    }

    try {
      const res = await changePassword({ password: currentPassword, newPassword });

      if (res) {
        setLocalMessages({ success: messages['ds.auth.changePassword.success'] });
      }
    } catch (error) {
      setLocalMessages({ error: messages['ds.auth.error.tryAgain'] });
    }
  };

  const clearErrors = () => setLocalMessages({});

  return (
    <div className="change-password-page">
      {localMessages.error && (
        <div>
          <div className="notification notification-error">
            <i className="material-icons">warning</i>
            {localMessages.error}
          </div>
        </div>
      )}

      <div className="title-container">
        <h3 className="change-password-title">
          {userHatName}
          {userHatDomain}
        </h3>
      </div>

      <form className="change-password-content" onSubmit={onChangePassword}>
        <div className="change-password-description">
          <FormatMessage id="ds.auth.changePassword.description" />
        </div>

        <label htmlFor="currentPass" hidden>
          Please enter your current HAT password
        </label>
        <input
          id="currentPass"
          className=""
          placeholder="Current password"
          type="password"
          onFocus={clearErrors}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label htmlFor="newPass" hidden>
          Please enter a new HAT password
        </label>
        <input
          id="newPass"
          className=""
          placeholder="New HAT password"
          type="password"
          onFocus={clearErrors}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label htmlFor="newPassConfirm" hidden>
          Please confirm your new HAT password
        </label>
        <input
          id="newPassConfirm"
          className=""
          placeholder="Confirm new password"
          type="password"
          onFocus={clearErrors}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {newPassword.length > 0 && <PasswordStrengthMeter passwordStrength={{ score }} />}

        {localMessages.success && (
          <div className="notification notification-success">{localMessages.success}</div>
        )}

        <div className="change-password-recommend">
          <FormatMessage id="ds.auth.changePassword.recommend" asHtml />
        </div>

        <div className="change-password-actions">
          <button className="btn btn-accent" type="submit">
            <FormatMessage id="ds.auth.input.changePassword" />
          </button>
        </div>
      </form>
    </div>
  );
};

const ChangePasswordContainer: React.FC = () => {
  const [zxcvbnReady, setZxcvbnReady] = useState(false);
  useEffect(() => {
    loadDynamicZxcvbn(() => setZxcvbnReady(true));
  }, []);

  if (!zxcvbnReady) return null;

  return <ChangePassword passwordStrength={zxcvbn} />;
};

export default ChangePasswordContainer;
