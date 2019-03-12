import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrderService } from "../shared/order.service";
import { Order } from "../shared/order.model";
import { OrderItem } from "../shared/order-item.model";
import { OrderSocketService } from "../socket/order-socket.service";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { untilDestroyed } from "ngx-take-until-destroy";
import { KitchenItem } from './kitchen-item.model';

@Component({
    selector: 'app-kitchen',
    templateUrl: './kitchen.component.html',
    styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit, OnDestroy {
    items: any[];

    constructor(
        private orderService: OrderService,
        private orderSocket: OrderSocketService
    ) {}

    ngOnInit() {
        this.getInProgressOrders();
        this.configureSockets();
    }

    /**
     * Calls order service to get all orders with a status of InProgress.
     * Maps response to Order array
     */
    getInProgressOrders(): void {
        this.orderService.getInProgressOrders().subscribe(response => {
            this.items = response.reduce(
                (acc, order) => {
                    var incompleteItems = this
                        .getIncompleteItems(order);

                    acc.push(...incompleteItems);
                    return acc;
                },
                [] as KitchenItem[]
            );
        });
    }

    /**
     * Calls order service to complete item, if it's status is InProgress
     * @param orderId The order id.
     * @param item The order item to be completed
     */
    completeItem(orderId: string, item: OrderItem) {
        if (item.status === 'InProgress') {
            this.orderService
                .completeItem(orderId, item._id)
                .subscribe(() => (item.status = 'Completed'));
        }
    }

    /**
     * Listen for newly created and updated orders to update the table view
     */
    configureSockets() {
        const openedSub$ = this.orderSocket.getOrdersOpened();
        const updatedSub$ = this.orderSocket.getOrdersUpdated();

        merge(openedSub$, updatedSub$)
            .pipe(
                tap(order => {
                    order.items
                        .filter(i => i.status == 'InProgress')
                        .map(i => {
                                let kitchenItem = this.mapToKitchenItem(i, order);

                            let filteredItems = this.items.filter(item => item._id === kitchenItem._id);
                            if(filteredItems.length > 0) {
                                filteredItems[0].status = kitchenItem.status;
                            } else {
                                this.items.push(kitchenItem);
                            }
                        })
                }),
                untilDestroyed(this)
            )
            .subscribe();
    }

    getIncompleteItems(order: Order) {
        return order.items
            .filter(i => i.status == 'InProgress')
            .map(i =>
                this.mapToKitchenItem(i, order)
            );
    }

    mapToKitchenItem(item: any, order: Order) {
        var kitchenItem = item as KitchenItem;
        kitchenItem.orderId = order._id;
        kitchenItem.tableId = order.tableId;
        return kitchenItem;
    }

    // Method needs to exist for untilDestroyed to work as expected in prod
    // builds.
    ngOnDestroy() {}
}
