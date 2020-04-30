import { HatClaim, HatClaimRequest } from '../hat-claim.interface';
import { buildClaimRequest } from '../hat-claim.service';

describe('buildClaimRequest returns correct data', () => {
  const optins: string[] = ['MadHATTERS', 'HAT Monthly', 'HCF'];

  const claim: HatClaim = {
    hatName: 'testing',
    hatCluster: 'hubat.net',
    email: 'testing@testing.com',
    optins: true,
    termsAgreed: true,
    password: 'myPassw0rd',
  };

  const claimRequest: HatClaimRequest = {
    hatName: 'testing',
    hatCluster: 'hubat.net',
    email: 'testing@testing.com',
    optins: optins,
    termsAgreed: true,
    password: 'myPassw0rd',
  };
  const claimApi = buildClaimRequest(claim);

  it('converts true optin into legacy formatted array', () => {
    expect(claimApi).toEqual(claimRequest);
  });
});
