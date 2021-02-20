import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../_services';
import {User} from '../_models';

@Injectable({providedIn: 'root'})
export class StateGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: User = this.auth.userValue;
    // User is logged in, navigate user to home page.
    if (user) {
      this.router.navigate(['/profile']);
    }
    // user is not logged in, so redirect to login page
    return true;
  }
}
