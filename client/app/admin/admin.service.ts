import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient
    ) { }

    getCounter(): Observable<any> {

        return this.http.get('http://localhost:3000/api/admin')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    filterOrdersToday(orders) {
        orders.forEach(function(element) {
            console.log(element);
            console.log(element.getDate());
        });
    }

    filterOrdersWeek() {

    }

    filterOrdersMonth() {

    }
}
