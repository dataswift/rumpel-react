export interface PdaLookupResponse {
  hatCluster: string;
  hatName: string;
  verified: boolean;
}

export interface PdaSignup {
  email: string;
  applicationId: string;
  platform?: string;
  tags?: string[];
  redirectUri: string;
  nextStep?: string;
  newsletterOptin?: boolean;
}

export interface RegistrationRedirectError {
  error: string;
  reason: string;
}
