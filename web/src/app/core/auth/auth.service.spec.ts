import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockOAuthService: jasmine.SpyObj<OAuthService>;

  beforeEach(() => {
    mockOAuthService = jasmine.createSpyObj('OAuthService', [
      'configure',
      'loadDiscoveryDocumentAndTryLogin',
      'initCodeFlow',
      'logOut',
      'hasValidIdToken',
      'hasValidAccessToken',
      'getIdentityClaims',
    ], {
      events: {
        subscribe: jasmine.createSpy('subscribe'),
      },
    });

    mockOAuthService.hasValidIdToken.and.returnValue(false);
    mockOAuthService.hasValidAccessToken.and.returnValue(false);
    mockOAuthService.getIdentityClaims.and.returnValue({});
    mockOAuthService.loadDiscoveryDocumentAndTryLogin.and.returnValue(
      Promise.resolve(true)
    );

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideOAuthClient(),
        AuthService,
        { provide: OAuthService, useValue: mockOAuthService },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should configure OAuth service on creation', () => {
    expect(mockOAuthService.configure).toHaveBeenCalled();
  });

  it('should return false for hasValidTokens when no tokens', () => {
    expect(service.hasValidTokens()).toBeFalse();
  });

  it('should return true for hasValidTokens when tokens are valid', () => {
    mockOAuthService.hasValidIdToken.and.returnValue(true);
    mockOAuthService.hasValidAccessToken.and.returnValue(true);
    expect(service.hasValidTokens()).toBeTrue();
  });

  it('should call initCodeFlow on login', () => {
    service.login();
    expect(mockOAuthService.initCodeFlow).toHaveBeenCalled();
  });

  it('should call logOut on logout', () => {
    service.logout();
    expect(mockOAuthService.logOut).toHaveBeenCalled();
  });
});
