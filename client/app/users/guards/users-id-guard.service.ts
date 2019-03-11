import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { UsersService } from '../users.service';

@Injectable({
    providedIn: 'root'
})
export class UsersIdGuard implements CanActivate {
    constructor(private usersService: UsersService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.usersService.currentUser != null) {
            return true;
        }

        this.router.navigate(['/login'], {
            queryParams: { redirectTo: state.url }
        });

        return false;
    }
}
