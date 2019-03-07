import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OrderSocketService } from '../socket/order-socket.service';
import { CounterService } from './counter.service';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {

    /** Table Object */
    // @Input() table: any;

    // @Input() waiterId: number;

    // dummy data for input table
    public table = {
        id: 1,
        table_number: 2

    };

    public counterType = 'counter';

    // dummy data for now
    public waiterId = 1;

    public orders: any;

    public sidebarOrder = null;

    public dicountedValue: number;

    public showView = true;

    /**
 * Array of tables within the restaurant.
 */
    public tables = [
        { id: 1, openOrder: false, orderId: null },
        { id: 2, openOrder: false, orderId: null },
        { id: 3, openOrder: false, orderId: null }
    ];

    /**
     * Counter Comoponent Constructor
     *
     * @param counterService Counter Service
     * @param formBuilder Form Builder
     */
    constructor(
        protected counterService: CounterService,
        private orderSocket: OrderSocketService
    ) { }

    ngOnInit() {
        this.getOrders();
        this.configureSockets();

        this.dicountedValue = 0;
    }

    /**
     * Get all the orders from the database
     */
    getOrders() {
        this.counterService
            .getOrders()
            .subscribe((data) => {
                console.log(data);
                this.orders = data;
                this.sidebarOrder = data[0];
            }, (error) => {
            });
    }
    /**
     * Listen for both the open and close methods to update table status on
     * completion.
     */
    configureSockets() {
        const openSub$ = this.orderSocket.getOrdersOpened();
        const closedSub$ = this.orderSocket.getOrdersCompleted();

        merge(openSub$, closedSub$)
            .pipe(
                tap(order => this.handleOrderEvent(order)),
                untilDestroyed(this)
            )
            .subscribe();
    }

    /**
     * Handle locking a table when a order is added and unlocking when it is
     * completed.
     */
    handleOrderEvent(order) {
        this.orders.push(order);
    }

    selectedOrder(order) {
        this.sidebarOrder = order;
    }

    completeOrder() {
        // TO DO: change table status from busy to available again.
        // Change order status to done
    }

    // Method needs to exist for untilDestroyed to work as expected in prod
    // builds.
    ngOnDestroy() { }

}
