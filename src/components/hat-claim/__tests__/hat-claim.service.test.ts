import { HatClaim } from "../hat-claim.interface";
import { buildClaimRequest } from "../hat-claim.service";

describe('buildClaimRequest returns correct data', () => {
    const claim: HatClaim = {
        hatName: 'testing',
        hatCluster: 'hubat.net',
        email: 'testing@testing.com',
        optins: true,
        termsAgreed: true,
        password: 'myPassw0rd'
    };
    const claimApi = buildClaimRequest(claim);

    it('returns the correct hat claim password', () => {
        expect(claimApi.password).toEqual(claim.password);
    });

    it('returns the correct hat claim hat name', () => {
        expect(claimApi.hatName).toEqual(claim.hatName);
    });

    it('returns the correct hat claim hatCluster', () => {
        expect(claimApi.hatCluster).toEqual(claim.hatCluster);
    });

    it('returns the correct hat claim email', () => {
        expect(claimApi.email).toEqual(claim.email);
    });

    it('returns the correct hat claim terms agreed', () => {
        expect(claimApi.termsAgreed).toEqual(claim.termsAgreed);
    });

    it('returns the correct hat claim optins', () => {
        const optins: string[] = ['MadHATTERS', 'HAT Monthly', 'HCF'];

        expect(claimApi.optins).toEqual(optins);
    });
});

