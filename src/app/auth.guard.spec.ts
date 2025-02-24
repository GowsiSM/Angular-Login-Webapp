import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerSpy }]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should allow navigation when authenticated', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('dummy-token');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect to login when not authenticated', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
