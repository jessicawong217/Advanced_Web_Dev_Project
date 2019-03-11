import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderViewModel } from './order-view.model';

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

    /**
     * Update an InProgress order item to Completed. Item must be InProgress of
     * the api reports an error.
     * @param id The order id.
     * @param itemId Id of the item on the order.
     */
    completeItem(id: string, itemId: string) {
        return this.http.post(`/api/orders/${id}/items/${itemId}/complete`, {})
            .pipe(
                catchError((error: any) => observableThrowError(error))
        ) as Observable<OrderViewModel>;
    }

    /**
     * Complete all items on an order.
     * @param id The order id.
     */
    completeAllItems(id: string) {
        return this.http.post(`/api/orders/${id}/items/complete`, {})
            .pipe(
                catchError((error: any) => observableThrowError(error))
            ) as Observable<OrderViewModel>;
    }
}
