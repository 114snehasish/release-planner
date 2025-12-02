import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient, OAuthService } from 'angular-oauth2-oidc';
import { App } from './app';
import { AuthService } from './core/auth';

describe('App', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['initializeAuth'], {
      isAuthenticated: jasmine.createSpy().and.returnValue(false),
      userName: jasmine.createSpy().and.returnValue(''),
    });
    mockAuthService.initializeAuth.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideOAuthClient(),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call initializeAuth on init', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.componentInstance.ngOnInit();
    expect(mockAuthService.initializeAuth).toHaveBeenCalled();
  });
});
