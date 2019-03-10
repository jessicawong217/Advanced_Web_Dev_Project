import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    getOrders(): Observable<any> {
        return this.http.get('/api/orders/in-progress')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    getAllOrders(): Observable<any> {
        return this.http.get('/api/orders')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    completeOrder(orderId: string): Observable<any> {
        return this.http.post(`/api/orders/${orderId}/complete`, null);
    }
}
