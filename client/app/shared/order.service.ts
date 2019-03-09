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

    /**
     * Calls API endpoint to get all orders in progress
     */
    getOrders(): Observable<any> {
        return this.http.get('/api/orders/in-progress')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Calls API endpoint to get all orders
     */
    getAllOrders(): Observable<any> {
        return this.http.get('/api/orders')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Calls API endpoint to complete an order
     */
    completeOrder(orderId): Observable<any> {
        return this.http.post('/api/orders/' + orderId + '/complete', '')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }
}
