import { HattersErrorCode } from "./HattersErrorCode";
import { RegistrationRedirectError } from "../types/Hatters";

export const signupTranslateErrorCode = (errorCode: number) => {
  const hattersError =  HattersErrorCode[errorCode] ;
  let error: RegistrationRedirectError = { error: '', reason: '' };

  switch (hattersError?.errorCode || 0) {
    case 3:
    case 30:
    case 31:
      error.error = 'hat_provisioning';
      error.reason = 'hat_name_already_taken';
      break;
    case 4:
      error.error = 'hat_provisioning';
      error.reason = 'hat_registration_failed';
      break;
    case 5:
      error.error = 'hat_exception';
      error.reason = 'hat_authentication_failed';
      break;
    case 6:
      error.error = 'hat_exception';
      error.reason = 'enabling_application_failed';
      break;
    case 7:
      error.error = 'hat_exception';
      error.reason = 'hat_communication_failure';
      break;
    case 8:
      error.error = 'application_misconfigured';
      error.reason = 'application_id_not_found';
      break;
    case 9:
      error.error = 'hat_provisioning';
      error.reason = 'remote_api_unavailable';
      break;
    case 12:
    case 29:
      error.error = 'hat_provisioning';
      error.reason = 'email_already_taken';
      break;
    case 32:
      error.error = 'hat_provisioning';
      error.reason = 'unclaimed_hat';
      break;
    default:
      error.error = 'hat_provisioning';
      error.reason = 'uncaught_error';
      break;
  }
  return error;
};
