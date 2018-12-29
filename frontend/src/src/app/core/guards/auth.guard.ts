import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/core/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log(`Auth guard ${JSON.stringify(currentUser)}`);
        if (currentUser) {
          console.log('User is already logged');
            // logged in so return true
            return true;
        }
        console.log(`current url ${state.url}`);

        // not logged in so redirect to login page with the return url
        if ('/login' !== state.url) {
          console.log(`Changing URL`);
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        return false;
    }
}
