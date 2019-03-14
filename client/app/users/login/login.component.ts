import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

import { UsersService } from '../users.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    /**
     * Current entered pin.
     */
    pin = '';

    /**
     * Determine if there has been an error with the current pin.
     */
    hasError = false;

    /**
     * Whether to clear the input on the next char entered.
     */
    clearOnNext = false;

    /**
     * The url to redirect the user after a successful pin entry.
     */
    url = '/';

    /**
     * Array at the length of pin so that it can be looped in view.
     */
    get splitPin() {
        return new Array(this.pin.length);
    }

    /**
     * Construct the login component.
     * @param usersService Users api service.
     * @param route Current route details.
     * @param router The router service, used to navigate back on successful
     * login.
     */
    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    /**
     * Get the redirection url from the query params.
     */
    ngOnInit() {
        this.route.queryParamMap
            .pipe(
                filter(pm => pm.has('redirectTo')),
                map(pm => pm.get('redirectTo'))
            )
            .subscribe(url => (this.url = url));
    }

    /**
     * Add a char to the pin. Clears pin first if needed.
     * @param key Char to add to pin.
     */
    addKey(key: string) {
        this.clearIfNeeded();

        if (this.pin.length < 6) { this.pin += key; }
    }

    /**
     * Remove the last char from the pin. Clears pin first if needed.
     */
    removeClick() {
        this.clearIfNeeded();

        if (this.pin.length > 0) { this.pin = this.pin.slice(0, -1); }
    }

    /**
     * Removes error value and clears pin of required.
     */
    clearIfNeeded() {
        this.hasError = false;

        if (this.clearOnNext) {
            this.pin = '';
            this.clearOnNext = false;
        }
    }

    /**
     * Handle submitting the users pin. Call to the service to ensure the user
     * exists. Redirects the user on success.
     */
    submitClick() {
        if (!this.clearOnNext) {
            // Should clear next time in the event of an error.
            this.clearOnNext = true;

            this.usersService
                .loginUserByPin(this.pin)
                .pipe(switchMap(() => this.router.navigateByUrl(this.url)))
                // We set the error state no matter the result, this is to catch
                // when the navigateByUrl goes to a page the user is the wrong
                // type for and set back to login. This results in the login
                // component not being destroyed so will look to the user as
                // frozen unless set.
                .subscribe(() => (this.hasError = true), () => (this.hasError = true));
        }
    }
}
