import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserViewModel } from './user.model';

@Injectable()
export class UsersService {
    /**
     * The current sessions user.
     */
    currentUser = null;

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
}
