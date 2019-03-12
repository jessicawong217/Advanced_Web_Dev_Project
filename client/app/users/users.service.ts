import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {
    /**
     * The current sessions user.
     */
    currentUser = null;

    constructor(private router: Router) {}

    /**
     * Get a user by their pin id. Stores the session user within the service.
     * @param id The users pin it.
     */
    loginUserById(id: string) {
        if (id == '1234') {
            this.currentUser = { name: 'Test User', id: '1234' };
            return of({ user: this.currentUser });
        }

        return throwError('no user');
    }

    logoutUser() {
        this.currentUser = null;
        this.router.navigate(['/login'], {
            queryParams: { redirectTo: this.router.url }
        });
    }
}
