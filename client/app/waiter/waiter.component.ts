import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderService } from '../shared/order.service';
import { TableService } from '../shared/table.service';
import { OrderSocketService } from '../socket/order-socket.service';
import { WaiterTable } from './waiter-tabel.model';
import { Order } from '../shared/models/order.model';

@Component({
    selector: 'app-waiter',
    templateUrl: './waiter.component.html',
    styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit, OnDestroy {

    public waiterType = 'waiter';

    public errorMessage: string;

    /**
     * Array of tables within the restaurant.
     */
    public tables: WaiterTable[] = [];

    public sidebarOrder: Order;

    constructor(
        private orderSocket: OrderSocketService,
        protected orderService: OrderService,
        private tableService: TableService
    ) {}

    ngOnInit() {
        this.tableService.getTables().subscribe(tables => {
            this.tables = tables as WaiterTable[];
            this.getInProgressOrders();
            this.configureSockets();
        });
    }

    /**
     * Get all in-progress orders from the database
     */
    getInProgressOrders() {
        this.orderService.getInProgressOrders().subscribe(orders => {
            for (let o = 0; o < orders.length; o++) {
                const order = orders[o];
                this.handleOrderEvent(order);
            }
        });
    }

    /**
     * Listen for both the open and close methods to update table status on
     * completion.
     */
    configureSockets() {
        var openSub$ = this.orderSocket.getOrdersOpened();
        var closedSub$ = this.orderSocket.getOrdersCompleted();
        var updatedSub$ = this.orderSocket.getOrdersUpdated();

        merge(openSub$, closedSub$, updatedSub$)
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
    handleOrderEvent(order: Order) {
        var openOrder = order.status == 'InProgress';
        var table = this.tables.filter(t => t.id == order.tableId)[0];

        table.orderId = openOrder ? order._id : null;
        table.order = openOrder ? order : null;
    }

    startOrderClick(table) {
        var newOrder = null;
        if (table.order != null) {
            newOrder = table.order;
        } else {
            newOrder = {
                tableId: table.id,
                items: []
            };
        }

        this.sidebarOrder = newOrder;
    }

    // Method needs to exist for untilDestroyed to work as expected in prod
    // builds.
    ngOnDestroy() {}
}
