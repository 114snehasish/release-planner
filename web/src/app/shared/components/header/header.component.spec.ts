import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../core/auth';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(
      'AuthService',
      ['logout'],
      {
        isAuthenticated: signal(true),
        userName: signal('Test User'),
      }
    );

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name when authenticated', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Welcome, Test User');
  });

  it('should call logout on authService when logout is clicked', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should return correct user initials for full name', () => {
    Object.defineProperty(mockAuthService, 'userName', {
      value: signal('John Doe'),
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    expect(component.getUserInitials()).toBe('JD');
  });

  it('should return first two characters for single name', () => {
    Object.defineProperty(mockAuthService, 'userName', {
      value: signal('admin'),
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    expect(component.getUserInitials()).toBe('AD');
  });
});
