import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      // Navigate to the login page with extras
      this.router.navigate(['/Authentication/SignIn'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
