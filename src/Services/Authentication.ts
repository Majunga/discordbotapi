/// <reference path="../types/oktaJwtVerifier.d.ts" />
import OktaJwtVerifier from '@okta/jwt-verifier'
import authConfig from '../authConfig'

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: authConfig.resourceServer.oidc.clientId,
  issuer: authConfig.resourceServer.oidc.issuer,
  assertClaims: authConfig.resourceServer.assertClaims,
  testing: authConfig.resourceServer.oidc.testing
});


/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req:any, res:any, next:any) {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error('Authorization header is required'))
  }
  let parts = req.headers.authorization.trim().split(' ')
  let accessToken = parts.pop()
  const audience = authConfig.resourceServer.assertClaims.aud;
  oktaJwtVerifier.verifyAccessToken(accessToken, audience)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      next()
    })
    .catch(next) // jwt did not verify!
}

export default authenticationRequired