import { PdaSignup, RegistrationRedirectError } from '../../types/Hatters';
import { PdaSignupQuery } from './RegistrationPage';

export const validatePdaSignupQueryParams = ({ application_id, redirect_uri }: PdaSignupQuery) => {
  let errorMsg = '';

  if (!application_id) {
    errorMsg = 'application_id_is_required';
  } else if (!redirect_uri) {
    errorMsg = 'redirect_uri_is_required';
  }

  return errorMsg;
};

export const queryParamsToSignupModel = ({
  application_id,
  redirect_uri,
  tags,
}: PdaSignupQuery): PdaSignup => ({
  email: '',
  applicationId: application_id,
  redirectUri: redirect_uri,
  tags: tags?.split(','),
});

export const redirectWithErrorParams = (redirectUri: string, error: RegistrationRedirectError) => {
  if (redirectUri) {
    window.location.href = `${redirectUri}?error=${error.error}&error_reason=${error.reason}`;
  }
};
