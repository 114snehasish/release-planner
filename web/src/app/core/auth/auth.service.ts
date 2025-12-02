import { Injectable, signal, computed } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isAuthenticatedSignal = signal<boolean>(false);
  private readonly userNameSignal = signal<string>('');

  readonly isAuthenticated = computed(() => this.isAuthenticatedSignal());
  readonly userName = computed(() => this.userNameSignal());

  constructor(private readonly oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);

    // Subscribe to OAuth events for state changes
    this.oauthService.events.subscribe(() => {
      this.updateAuthState();
    });
  }

  /**
   * Initialize the authentication flow.
   * Loads discovery document and triggers login if not authenticated.
   */
  async initializeAuth(): Promise<boolean> {
    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.updateAuthState();

      if (!this.hasValidTokens()) {
        this.oauthService.initCodeFlow();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Authentication initialization failed:', error);
      return false;
    }
  }

  /**
   * Initiate the login flow.
   */
  login(): void {
    this.oauthService.initCodeFlow();
  }

  /**
   * Log out the current user.
   */
  logout(): void {
    this.oauthService.logOut();
  }

  /**
   * Check if the user has valid tokens.
   */
  hasValidTokens(): boolean {
    return (
      this.oauthService.hasValidIdToken() &&
      this.oauthService.hasValidAccessToken()
    );
  }

  /**
   * Get the identity claims from the ID token.
   */
  getIdentityClaims(): Record<string, unknown> | null {
    return this.oauthService.getIdentityClaims();
  }

  /**
   * Update authentication state signals.
   */
  private updateAuthState(): void {
    const hasValidTokens = this.hasValidTokens();
    this.isAuthenticatedSignal.set(hasValidTokens);

    if (hasValidTokens) {
      const claims = this.getIdentityClaims();
      if (claims) {
        const name =
          (claims['preferred_username'] as string) ||
          (claims['name'] as string) ||
          (claims['email'] as string) ||
          '';
        this.userNameSignal.set(name);
      }
    } else {
      this.userNameSignal.set('');
    }
  }
}
