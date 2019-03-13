import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { UsersService } from '../users.service';

/**
 * Route guard to auth a user by their pin. Validates the pin matches a user and
 * that the user is the correct type defined for the view.
 */
@Injectable()
export class UsersIdGuard implements CanActivate {
    /**
     * Construct the guard with required deps.
     * @param usersService The user api service.
     * @param router The router service to redirect the user.
     */
    constructor(private usersService: UsersService, private router: Router) {}

    /**
     * First validate a user is set, then if there is a type defined in the data
     * of the route validate the user has a matching type.
     * @param route The current route snapshot.
     * @param state The router state.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.usersService.currentUser != null) {
            var requiredTypes = route.data['userType'] || null;

            if (typeof requiredTypes == 'string') {
                requiredTypes = [requiredTypes];
            }

            if (
                requiredTypes == null ||
                requiredTypes.indexOf(this.usersService.currentUser.type) != -1
            ) {
                return true;
            }
        }

        // Clear the current user if for some reason the login fails, then
        // redirect the user to the login page.
        this.usersService.clearUser();
        this.router.navigate(['/login'], {
            queryParams: { redirectTo: state.url }
        });

        return false;
    }
}
