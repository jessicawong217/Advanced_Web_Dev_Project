import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MenuService } from '../menu/menu.service';
import { OrderSocketService } from '../socket/order-socket.service';
import { WaiterService } from './waiter.service';
import { Order } from '../shared/order.model';
import { OrderItem } from '../shared/order-item.model';
import { UsersService } from '../users/users.service';

@Component({
    selector: 'app-waiter',
    templateUrl: './waiter.component.html',
    styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit, OnDestroy {
    // Dummy data to pass into order panel component
    public tableId = 2;

    public waiterId = 1;

    public orders: any;

    public showView = true;

    public sidebarOrder = null;

    /**
     * Array of tables within the restaurant.
     */
    public tables = [
        { id: 1, openOrder: false, orderId: null },
        { id: 2, openOrder: false, orderId: null },
        { id: 3, openOrder: false, orderId: null }
    ];

    constructor(
        private waiterService: WaiterService,
        private orderSocket: OrderSocketService,
        private menuService: MenuService,
        private usersService: UsersService,
    ) { }

    ngOnInit() {
        this.configureSockets();
        // this.test();

        // IDEA: would be to get all InProgress orders (or at least their ids)
        // on init and assign them to the correct tables at init. The socket
        // events would then handle addition and removal of orders.

        this.menuService.getMenu().subscribe(result => {
            console.log(result);
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
        const openOrder = order.status === 'InProgress';
        const table = this.tables.filter(t => t.id === order.tableId)[0];

        table.openOrder = openOrder;
        table.orderId = order.id;
    }

    startOrderClick(table) {
        const newOrder = {
            tableId: table.id,
            items: []
        } as Order;

        this.sidebarOrder = newOrder;
    }

    // TODO: change this to show the order panel
    // if a table is selected
    show(val: boolean) {
        this.showView = val;
    }
    
    /**
     * Log the current user out.
     */
    logoutClick() {
        this.usersService.logoutUser();
    }

    // Method needs to exist for untilDestroyed to work as expected in prod
    // builds.
    ngOnDestroy() { }
}
