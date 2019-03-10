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
    this.orderService.getOrders().subscribe(response => this.orders = response);
  }

  completeOrderItem(item: OrderItem) {
      item.status = "Completed";
  }

  completeOrder(order: Order) {
      if(this.allItemsCompleted(order)) {
          this.orderService.completeOrder(order._id)
              .subscribe(() => order.status = 'Completed');
      } else {
          //TODO: display error message to user
          console.log("must complete all order items first");
      }
  }

  private allItemsCompleted(order: Order) {
      for(let i = 0; i < order.orderItems.length; i++) {
          if(order.orderItems[i].status !== "Completed") {
              return false;
          }
      }
      return true;
  }

}
