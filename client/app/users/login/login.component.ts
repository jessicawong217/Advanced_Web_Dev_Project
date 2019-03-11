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
    pin = '';

    hasError = false;

    clearOnNext = false;

    url = '/';

    get splitPin() {
        return new Array(this.pin.length);
    }

    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(
                filter(pm => pm.has('redirectTo')),
                map(pm => pm.get('redirectTo'))
            )
            .subscribe(url => (this.url = url));
    }

    addKey(key: string) {
        this.clearIfNeeded();

        if (this.pin.length < 6) this.pin += key;
    }

    removeClick() {
        this.clearIfNeeded();

        if (this.pin.length > 0) this.pin = this.pin.slice(0, -1);
    }

    clearIfNeeded() {
        this.hasError = false;

        if (this.clearOnNext) {
            this.pin = '';
            this.clearOnNext = false;
        }
    }

    submitClick() {
        this.clearOnNext = true;

        this.usersService
            .loginUserById(this.pin)
            .pipe(
                switchMap(() => {
                    console.log(this.url);
                    return this.router.navigateByUrl(this.url);
                })
            )
            .subscribe(null, () => (this.hasError = true));
    }
}
