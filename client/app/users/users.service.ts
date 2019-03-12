import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserViewModel, User } from './user.model';

/**
 * User service to interact with users API endpoint..
 */
@Injectable()
export class UsersService {
    /**
     * The current sessions user.
     */
    currentUser = null;

    /**
     * Construct the service importing deps.
     * @param httpClient The angular http client.
     * @param router Router object.
     */
    constructor(private httpClient: HttpClient, private router: Router) {}

    /**
     * Get a user by their pin id. Stores the session user within the service.
     * @param id The users pin it.
     */
    loginUserByPin(pin: string) {
        return this.httpClient.post<UserViewModel>(
            environment.apiUrl + 'users/login',
            { pin: pin }
        );
    }

    /**
     * Log a user out.
     */
    logoutUser() {
        this.currentUser = null;
        this.router.navigate(['/login'], {
            queryParams: { redirectTo: this.router.url }
        });
    }

    /**
     * Create a new user.
     * @param user The new user data.
     */
    create(user: User) {
        return this.httpClient.post<UserViewModel>(
            environment.apiUrl + 'users',
            { user: user }
        );
    }

    /**
     * Create a new user.
     * @param user The new user data.
     */
    update(id: string, user: User) {
        return this.httpClient.put<UserViewModel>(
            environment.apiUrl + 'users/' + id,
            { user: user }
        );
    }
}
