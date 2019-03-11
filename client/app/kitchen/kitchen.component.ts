import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrderService } from "../shared/order.service";
import { Order } from "../shared/order.model";
import { OrderItem } from "../shared/order-item.model";
import { OrderSocketService } from "../socket/order-socket.service";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { untilDestroyed } from "ngx-take-until-destroy";

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit, OnDestroy {

    orders: Order[];

    constructor(private orderService: OrderService,
                private orderSocket: OrderSocketService) {
    }

    ngOnInit() {
        this.getInProgressOrders();
        this.configureSockets();
    }

    /**
     * Calls order service to get all orders with a status of InProgress.
     * Maps response to Order array
     */
    getInProgressOrders(): void {
        this.orderService.getInProgressOrders().subscribe(response => this.orders = response);
    }

    /**
     * Calls order service to complete item, if it's status is InProgress
     * @param orderId The order id.
     * @param item The order item to be completed
     */
    completeItem(orderId: string, item: OrderItem) {
        if (item.status === "InProgress") {
            this.orderService.completeItem(orderId, item._id).subscribe(() => item.status = "Completed");
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
                tap((order) => {
                    //check if order already exists
                    let filteredOrders = this.orders.filter(o => o._id === order._id);
                    if (filteredOrders.length > 0) {
                        //if order exists, replace it's items with the updated orders items
                        let existingOrder = filteredOrders[0];
                        existingOrder.items = order.items;
                    } else {
                        //if order didn't already exist, add to orders list
                        this.orders.push(order);
                    }
                }),
                untilDestroyed(this)
            )
            .subscribe();
    }

    // Method needs to exist for untilDestroyed to work as expected in prod
    // builds.
    ngOnDestroy() { }
}
