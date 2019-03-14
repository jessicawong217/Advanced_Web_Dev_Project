import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MenuService } from '../menu/menu.service';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { UsersService } from '../users/users.service';
import { AdminService } from './admin.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    newMenuForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: [0, Validators.required],
        category: ['Main']
    });

    newUserForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        type: ['Waiter', [Validators.required]],
        pin: ['', [Validators.required, Validators.pattern('[0-9]{4}')]]
    });

    public menu = [];

    public users = [];

    public orders: Order[];

    public todayTotal: number;

    public weekTotal: number;

    public monthTotal: number;

    constructor(
        protected adminService: AdminService,
        private menuService: MenuService,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        protected orderSerice: OrderService,
    ) { }

    ngOnInit() {
        this.getMenu();
        this.getUsers();
        this.getTotalForToday();
        this.getTotalForLastWeek();
        this.getTotalForLastMonth();
    }

    /**
     * Get total for last 24h
     */
    getTotalForToday() {
        const timePeriod = new Object();
        timePeriod.to = new Date();
        timePeriod.from = new Date(new Date().setDate(new Date().getDate() - 1));

        this.adminService
            .getTotalForTime(timePeriod)
            .subscribe((data) => {
                this.todayTotal = data.total;
            }, (error) => {
            });
    }

    /**
     * Get total for last 7 days
     */
    getTotalForLastWeek() {
        const timePeriod = new Object();
        timePeriod.to = new Date();
        timePeriod.from = new Date(new Date().setDate(new Date().getDate() - 7));

        this.adminService
            .getTotalForTime(timePeriod)
            .subscribe((data) => {
                this.weekTotal = data.total;
                console.log(data);
            }, (error) => {
            });
    }

    /**
     * Get total for last 28 days
     */
    getTotalForLastMonth() {
        const timePeriod = new Object();
        timePeriod.to = new Date();
        timePeriod.from = new Date(new Date().setDate(new Date().getDate() - 28));

        this.adminService
            .getTotalForTime(timePeriod)
            .subscribe((data) => {
                this.monthTotal = data.total;
                console.log(data);
            }, (error) => {
            });
    }

    getMenu() {
        this.menuService.getMenu().subscribe(result => {
            this.menu = result;
        });
    }

    getUsers() {
        this.usersService.getUsers().subscribe(result => {
            this.users = result;
        });
    }

    identifyMenu(index, item) {
        return index;
    }

    identifyUsers(index, item) {
        return index;
    }

    addItem() {
        if (this.newMenuForm.valid) {
            const newItem = this.newMenuForm.value;
            console.log(newItem);
            this.menuService.create(newItem).subscribe(
                data => {
                    console.log('item created');
                    console.log(data.item);

                    // Reload the menu after the item is added.
                    this.getMenu();
                },
                () => {
                    console.log('failed');
                }
            );
        }
    }

    removeItem(id) {
        console.log(id);
        const element = document.getElementById(id).parentElement;
        console.log(element.innerHTML);
        element.remove();
        this.menuService.delete(id)
            .subscribe(res => {
                console.log(res);
            });
    }

    addUser() {
        if (this.newUserForm.valid) {
            const newUser = this.newUserForm.value;
            console.log(newUser);
            this.usersService.create(newUser)
                .subscribe((data) => {
                    console.log('item created');
                    console.log(data.user);

                    // Reload the users after the user is added
                    this.getUsers();
                }, () => {
                    console.log('failed');
                });
        }
    }

    removeUser(id) {
        console.log(id);
        const element = document.getElementById(id).parentElement;
        console.log(element.innerHTML);
        element.remove();
        this.usersService.delete(id)
            .subscribe(res => {
                console.log(res);
            });
    }

    removeBrackets(string) {
        return string.replace(/\<[^\>]*\>/, '');
    }

    isNumeric(num) {
        return !isNaN(num);
    }

    openMenuNav() {
        document.getElementById('menuBar').style.width = '30%';
        document.getElementById('menuBar').style.display = 'block';
        document.getElementById('menuMain').style.visibility = 'hidden';
        document.getElementById('summary').style.marginLeft = '20%';
    }

    closeMenuNav() {
        document.getElementById('menuBar').style.width = '0';
        document.getElementById('menuBar').style.display = 'none';
        document.getElementById('menuMain').style.visibility = 'visible';
        document.getElementById('summary').style.marginLeft = '0';
    }

    openStaffNav() {
        document.getElementById('staffBar').style.width = '30%';
        document.getElementById('staffBar').style.display = 'block';
        document.getElementById('staffMain').style.visibility = 'hidden';
        document.getElementById('analytics').style.marginLeft = '20%';
    }

    closeStaffNav() {
        document.getElementById('staffBar').style.width = '0';
        document.getElementById('staffBar').style.display = 'none';
        document.getElementById('staffMain').style.visibility = 'visible';
        document.getElementById('analytics').style.marginLeft = '0';
    }
}
