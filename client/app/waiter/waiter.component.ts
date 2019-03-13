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


    /**
     * Array of tables within the restaurant.
     */
    public tables = [
        { id: 1, openOrder: false, orderId: null },
        { id: 2, openOrder: false, orderId: null },
        { id: 3, openOrder: false, orderId: null },
        { id: 4, openOrder: false, orderId: null },
        { id: 5, openOrder: false, orderId: null },
        { id: 6, openOrder: false, orderId: null },
        { id: 7, openOrder: false, orderId: null },
        { id: 8, openOrder: false, orderId: null },
        { id: 9, openOrder: false, orderId: null },
        { id: 10, openOrder: false, orderId: null },
        { id: 11, openOrder: false, orderId: null },
        { id: 12, openOrder: false, orderId: null }
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
        this.configureSockets();
        this.getAllOrders();


        // this.test();

        // IDEA: would be to get all InProgress orders (or at least their ids)
        // on init and assign them to the correct tables at init. The socket
        // events would then handle addition and removal of orders.

        this.menuService.getMenu().subscribe(result => {
            console.log(result);
        });
    }

    /**
     * Get all the orders from the database
     */
    getAllOrders() {
        this.orderService
            .getAllOrders()
            .subscribe((data) => {
                this.orders = data;
                this.sidebarOrder = data[0];
            }, (error) => {
            });
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
        this.orders.forEach((element, index) => {
            if (element._id === order._id) {
                this.orders.splice(index, 1);
            }
        });

        this.orders.push(order);
    }

    selectedOrder(order) {
        this.sidebarOrder = order;
    }


    startOrderClick(table) {
        var newOrder = {
            tableId: table.id,
            items: []
        };

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
