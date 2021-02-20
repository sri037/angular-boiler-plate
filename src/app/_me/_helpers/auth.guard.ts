import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../_services';
import {User} from '../_models';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: User = this.auth.userValue;
    if (user) {
      if (route.data.role && route.data.role.indexOf(user.role) === -1) {
        // user is not authorised, redirect user to 403 page
        this.router.navigate(['/403']);
        return false;
      }
      // user is authorised, so return true
      return true;
    }
    // user is not logged in, so redirect to login page
    this.router.navigate(['/user/auth/login'], {queryParams: {returnUrl: state.url}})
      .then(() => {
      });
    return false;
  }
}
