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

  completeItem(orderId: string, item: OrderItem) {
      if(item.status === 'InProgress') {
          this.orderService.completeItem(orderId, item._id).subscribe(() => item.status = 'Completed');
      }
  }

}
