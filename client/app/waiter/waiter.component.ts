import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderSocketService } from '../socket/order-socket.service';
import { WaiterService } from './waiter.service';
import { untilDestroyed} from 'ngx-take-until-destroy';
import { MenuService } from '../menu/menu.service';

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
        private menuService: MenuService
    ) {}

    ngOnInit() {
        this.configureSockets();
        // this.test();

        // IDEA: would be to get all InProgress orders (or at least their ids)
        // on init and assign them to the correct tables at init. The socket
        // events would then handle addition and removal of orders.

        this.menuService.getMenu().subscribe(result => {
            console.log(result);
        })
    }

    /**
     * Listen for both the open and close methods to update table status on
     * completion.
     */
    configureSockets() {
        var openSub$ = this.orderSocket.getOrdersOpened();
        var closedSub$ = this.orderSocket.getOrdersCompleted();

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
        var openOrder = order.status == 'InProgress';
        var table = this.tables.filter(t => t.id == order.tableId)[0];

        table.openOrder = openOrder;
        table.orderId = order.id;
    }

    startOrderClick(table) {
        var newOrder = {
            tableId: table.id,
            orderItems: []
        };

        this.sidebarOrder = newOrder;
    }

    // TODO: change this to show the order panel
    // if a table is selected
    show(val: boolean) {
        this.showView = val;
    }

    // Method needs to exist for untilDestroyed to work as expected in prod
    // builds.
    ngOnDestroy() {}
}
