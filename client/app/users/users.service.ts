import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, UserViewModel } from './user.model';

/**
 * User service to interact with users API endpoint..
 */
@Injectable()
export class UsersService {
    /**
     * The current sessions user.
     */
    currentUser: User = null;

    /**
     * Construct the service importing deps.
     * @param httpClient The angular http client.
     * @param router Router object.
     */
    constructor(private httpClient: HttpClient, private router: Router) { }

    /**
     * Get paged list of users.
     */
    getUsers(page = 1, perpage = 50, query: string = null) {
        const queryParams = { skip: 0 + '', limit: perpage + '' } as {
            [param: string]: string;
        };

        if (page > 1) {
            queryParams.skip = page * perpage + '';
        }

        if (!!query) {
            queryParams.query = query;
        }
        return this.httpClient.get<User[]>(environment.apiUrl + 'users', {
            params: queryParams
        });
    }

    /**
     * Get a user by their pin id. Stores the session user within the service.
     * @param id The users pin it.
     */
    loginUserByPin(pin: string) {
        return this.httpClient
            .post<UserViewModel>(environment.apiUrl + 'users/login', {
                pin: pin
            })
            .pipe(
                tap(response => {
                    this.currentUser = response.user;
                })
            );
    }

    /**
     * Log a user out.
     */
    logoutUser() {
        this.clearUser();
        this.router.navigate(['/login'], {
            queryParams: { redirectTo: this.router.url }
        });
    }

    /**
     * Clear the current logged in user.
     */
    clearUser() {
        this.clearUser = null;
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

    /**
     * Delete a user
     */
    delete(id: string) {
        return this.httpClient.delete<UserViewModel>(
            environment.apiUrl + 'users/' + id
        );
    }
}
