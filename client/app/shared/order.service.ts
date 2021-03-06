import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OrderItem } from '../shared/models/order-item.model';
import { Order } from '../shared/models/order.model';
import { OrderViewModel } from './models/order-view.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    /**
     * Calls API endpoint to start an order
     */
    startOrder(order: Order) {
        return this.http.post<OrderViewModel>('/api/orders', { order: order })
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Calls API endpoint to get all orders in progress
     */
    getInProgressOrders() {
        return this.http.get<Order[]>('/api/orders/in-progress')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Calls API endpoint to get all orders
     */
    getAllOrders() {
        return this.http.get<Order[]>('/api/orders')
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Calls API endpoint to complete an order
     */
    completeOrder(orderId: string, data: object) {
        return this.http.post<OrderViewModel>('/api/orders/' + orderId + '/complete', data)
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Calls API endpoint to update an order
     */
    updateOrder(orderId: string, items: OrderItem[]) {
        return this.http.patch<OrderViewModel>('/api/orders/' + orderId, { items })
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Update an InProgress order item to Completed. Item must be InProgress or
     * the api reports an error.
     * @param id The order id.
     * @param itemId Id of the item on the order.
     */
    completeItem(id: string, itemId: string) {
        return this.http.post<OrderViewModel>(`/api/orders/${id}/items/${itemId}/complete`, {})
            .pipe(
                catchError((error: any) => observableThrowError(error))
            ) as Observable<OrderViewModel>;
    }

    /**
     * Complete all items on an order.
     * @param id The order id.
     */
    completeAllItems(id: string) {
        return this.http.post<OrderViewModel>(`/api/orders/${id}/items/complete`, {})
            .pipe(
                catchError((error: any) => observableThrowError(error))
            ) as Observable<OrderViewModel>;
    }
}
