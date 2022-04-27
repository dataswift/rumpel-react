export type HattersError = {
  errorCode: number;
  cause: string;
};

export type HattersErrorCodeType = Record<number, HattersError>;

export const HattersErrorCode: HattersErrorCodeType = {
  1: { errorCode: 1, cause: 'unexpected_exception' },
  2: { errorCode: 2, cause: 'hatters_exception' },
  3: { errorCode: 3, cause: 'duplicate_hat_exception' },
  4: { errorCode: 4, cause: 'milliner_api_exception' },
  5: { errorCode: 5, cause: 'hat_authentication_exception' },
  6: { errorCode: 6, cause: 'hat_setup_exception' },
  7: { errorCode: 7, cause: 'hat_api_exception' },
  8: { errorCode: 8, cause: 'details_not_found_exception' },
  9: { errorCode: 9, cause: 'api_exception' },
  10: { errorCode: 10, cause: 'unknown_hat_signup_exception' },
  11: { errorCode: 11, cause: 'invalid_hatname' },
  12: { errorCode: 12, cause: 'invalid_email' },
  13: { errorCode: 13, cause: 'hat_already_claimed' },
  14: { errorCode: 14, cause: 'unauthorized' },
  15: { errorCode: 15, cause: 'invalid_claim' },
  16: { errorCode: 16, cause: 'hatname_not_found' },
  17: { errorCode: 17, cause: 'too_many_requests' },
  18: { errorCode: 18, cause: 'application_not_found' },
  19: { errorCode: 19, cause: 'password_missing' },
  20: { errorCode: 20, cause: 'failed_to_parse_application_info' },
  21: { errorCode: 21, cause: 'failed_to_retrieve_application_info' },
  22: { errorCode: 22, cause: 'function_not_found' },
  23: { errorCode: 23, cause: 'signup_validation_error' },
  24: { errorCode: 24, cause: 'hat_provisioning_error' },
  25: { errorCode: 25, cause: 'unexpected_hat_signup_error' },
  26: { errorCode: 26, cause: 'card_error' },
  27: { errorCode: 27, cause: 'unknown_card_error' },
  28: { errorCode: 28, cause: 'invalid_application_id' },
  29: { errorCode: 29, cause: 'hatters_duplicate_email' },
  30: { errorCode: 30, cause: 'hatters_duplicate_username' },
  31: { errorCode: 31, cause: 'hatters_duplicate_registration' },
  32: { errorCode: 32, cause: 'hatters_unclaimed_hat' },
  33: { errorCode: 33, cause: 'hatters_rate_limit' },
};
