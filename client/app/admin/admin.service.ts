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

    getTotalForTime(body): Observable<any> {
        return this.http.post('/api/orders/total-time', body
        )
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }
}
