import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WaiterService {

    constructor(
        private http: HttpClient
    ) { }

    getCounter(): Observable<any> {
        return this.http.get('api/counter')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }
}
