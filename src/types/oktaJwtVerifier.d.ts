/// <reference types="jwks-rsa" />
/// <reference types="@okta/jwt-verifier" />
export = OktaJwtVerifier;
declare class OktaJwtVerifier {
    constructor(options?: {});
    claimsToAssert: any;
    issuer: any;
    jwksClient: import("jwks-rsa").JwksClient;
    verifier: any;
    verifyAsPromise(accessTokenString: any): Promise<any>;
    verifyAccessToken(accessTokenString: any, expectedAudience: any): Promise<any>;
}
