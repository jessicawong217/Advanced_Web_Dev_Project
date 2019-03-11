import { Component, OnInit } from '@angular/core';
import { OrderService } from "../shared/order.service";
import { Order } from "../shared/order.model";
import { OrderItem } from "../shared/order-item.model";

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getInProgressOrders().subscribe(response => this.orders = response);
  }

    /**
     * Calls order service to complete item, if it's status is InProgress
     * @param orderId The order id.
     * @param item The order item to be completed
     */
  completeItem(orderId: string, item: OrderItem) {
      if(item.status === 'InProgress') {
          this.orderService.completeItem(orderId, item._id).subscribe(() => item.status = 'Completed');
      }
  }

}
