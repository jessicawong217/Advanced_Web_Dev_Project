import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

@Injectable()
export class UsersService {
    currentUser = null;

    constructor() {}

    loginUserById(id: string) {
        if (id == '1234') {
            this.currentUser = { name: 'Test User', id: '1234' };
            return of({ user: this.currentUser });
        }

        return throwError('no user');
    }
}
