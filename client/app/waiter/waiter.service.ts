import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WaiterService {
    constructor(private http: HttpClient) {}

    getCounter(): Observable<any> {
        // I had to point straight to the UI because the proxy doesn't work on my machine
        // you should be able to just do '/api/counter'
        return this.http
            .get('http://localhost:3000/api/counter')
            .pipe(catchError((error: any) => observableThrowError(error)));
    }
}
