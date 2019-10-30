import { HatClaim, HatClaimRequest } from "./hat-claim.interface";
import { IHttpResponse, post } from "../../services/BackendService";

const optins: string[] = ['MadHATTERS', 'HAT Monthly', 'HCF'];

export const buildClaimRequest = (claim: HatClaim): HatClaimRequest => {
    return {
        email: claim.email,
        termsAgreed: true,
        optins: claim.optins ? optins : [],
        hatName: claim.hatName,
        hatCluster: claim.hatCluster,
        password: claim.password
    };
};

/*
  Call Hatters API call through HAT
 */
export const claimHat = async (
    claimToken: string,
    body: HatClaimRequest
): Promise<IHttpResponse<HatClaimRequest>> => {
    const args: RequestInit = { method: "post", body: JSON.stringify(body), headers: jsonContentHeader() };

    return await post<HatClaimRequest>(`https://${body.hatName + '.' + body.hatCluster}/control/v2/auth/claim/complete/${claimToken}`, body, args);
};

function jsonContentHeader(): Headers {
    const mHeaders = new Headers();

    mHeaders.append('Content-Type', 'application/json');

    return mHeaders;
}