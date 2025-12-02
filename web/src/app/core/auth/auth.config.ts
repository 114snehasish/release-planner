import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // URL of the Identity Provider
  issuer: 'http://localhost:8080/realms/demo',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id registered with the auth-server
  clientId: 'release-planner',

  // Set the scope for the permissions the client should request
  scope: 'openid profile email',

  // Use Authorization Code Flow with PKCE
  responseType: 'code',

  // Show discovery document logs in development
  showDebugInformation: false,

  // Enable PKCE (Proof Key for Code Exchange)
  disablePKCE: false,

  // Require HTTPS for issuer (disabled for localhost development)
  requireHttps: false,
};
