import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      setTimeout(() => this.router.navigate(['/login']), 0);
      return false;
    }
    return true;
  }
}
