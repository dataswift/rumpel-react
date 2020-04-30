export interface HatClaimRequest {
  email: string;
  termsAgreed: boolean;
  optins: string[];
  hatName: string;
  hatCluster: string;
  password: string;
}

export interface HatClaim {
  email: string;
  termsAgreed: boolean;
  optins: boolean;
  hatName: string;
  hatCluster: string;
  password: string;
}

export interface HatClaimApiResponse {
  message: string;
}
