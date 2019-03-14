import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MenuService } from '../menu/menu.service';
import { WaiterService } from './waiter.service';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { OrderSocketService } from '../socket/order-socket.service';
import { OrderItem } from '../shared/order-item.model';
import { UsersService } from '../users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-waiter',
    templateUrl: './waiter.component.html',
    styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit, OnDestroy {
    // Dummy data to pass into order panel component
    public waiterType = 'waiter';

    public tableId = 2;

    public waiterId = 1;

    public orders: Order[];

    public showView = true;

    public sidebarOrder = null;

    public errorMessage: string;


    /**
     * Array of tables within the restaurant.
     */
    public tables = [
        { id: 1, openOrder: false, orderId: null, order: null, openId: false },
        { id: 2, openOrder: false, orderId: null, order: null, openId: false },
        { id: 3, openOrder: false, orderId: null, order: null, openId: false },
        { id: 4, openOrder: false, orderId: null, order: null, openId: false },
        { id: 5, openOrder: false, orderId: null, order: null, openId: false },
        { id: 6, openOrder: false, orderId: null, order: null, openId: false },
        { id: 7, openOrder: false, orderId: null, order: null, openId: false },
        { id: 8, openOrder: false, orderId: null, order: null, openId: false },
        { id: 9, openOrder: false, orderId: null, order: null, openId: false },
        { id: 10, openOrder: false, orderId: null, order: null, openId: false },
        { id: 11, openOrder: false, orderId: null, order: null, openId: false },
        { id: 12, openOrder: false, orderId: null, order: null, openId: false }
    ];

    public staff = [
        {
            firstname: 'Klaus',
            surname: 'Logan',
            role: 'Waiter'
        }
    ];


    constructor(
        private waiterService: WaiterService,
        private orderSocket: OrderSocketService,
        private menuService: MenuService,
        protected orderService: OrderService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.getInProgressOrders()
        this.configureSockets();



        // this.test();

        // IDEA: would be to get all InProgress orders (or at least their ids)
        // on init and assign them to the correct tables at init. The socket
        // events would then handle addition and removal of orders.


    }

    /**
     * Get all in-progress orders from the database
     */
    getInProgressOrders() {
      this.orderService.getInProgressOrders().subscribe(orders=>{
        for (let o =0; o < orders.length; o++){
          const order = orders[o];
          this.handleOrderEvent(order);
        }

      });
      //var openOrder = order.status == 'InProgress';
      //var table = this.tables.filter(t => t.id == order.tableId)[0];
    }

    openMenuNav() {
        document.getElementById("menuBar").style.width = "20%";
        document.getElementById("menuBar").style.display = "block";
        document.getElementById("menuMain").style.visibility = "hidden";
        document.getElementById("summary").style.marginLeft = "15%";
    }

    closeMenuNav() {
        document.getElementById("menuBar").style.width = "0";
        document.getElementById("menuBar").style.display = "none";
        document.getElementById("menuMain").style.visibility = "visible";
        document.getElementById("summary").style.marginLeft = "0";
    }

    /**
     * Log the current user out.
     */
    logoutClick() {
        this.usersService.logoutUser();
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
  handleOrderEvent(order) {
      var openOrder = order.status == 'InProgress';
      var table = this.tables.filter(t => t.id == order.tableId)[0];

      table.openOrder = openOrder;
      table.orderId = order.id;
      table.order = openOrder? order:null;

  }



  startOrderClick(table) {
      var newOrder = null;
      if (table.order!=null){
        newOrder = table.order;
      }else {
       newOrder = {
          tableId: table.id,
          items: []
      };
    }

      this.sidebarOrder = newOrder;
  }

  // TODO: change this to show the order panel
  // if a table is selected
  show(val: boolean) {
      this.showView = val;
  }




  openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";



  }

  // Method needs to exist for untilDestroyed to work as expected in prod
  // builds.
  ngOnDestroy() { }

  }
