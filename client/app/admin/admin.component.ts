import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { AdminService } from './admin.service';
import { MenuService } from '../menu/menu.service';
import { MenuItemCategory, MenuItem } from '../menu/menu.model';
import { UsersService } from '../users/users.service';

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

    private displayOrdersTodayBool;
    private displayOrdersWeekBool;
    private displayOrdersMonthBool;

    constructor(
        protected adminService: AdminService,
        private menuService: MenuService,
        private usersService: UsersService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.getMenu();
        this.getUsers();
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
            var newItem = this.newMenuForm.value;
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
        var element = document.getElementById(id).parentElement;
        console.log(element.innerHTML);
        element.remove();
        this.menuService.delete(id)
            .subscribe(res => {
                console.log(res);
            });
    }

    addUser() {
        if (this.newUserForm.valid) {
            var newUser = this.newUserForm.value;
            console.log(newUser);
            this.usersService.create(newUser)
                .subscribe((data) => {
                    console.log('item created');
                    console.log(data.user)

                    // Reload the users after the user is added
                    this.getUsers();
                }, () => {
                    console.log('failed');
                });
        }
    }

    removeUser(id) {
        console.log(id);
        var element = document.getElementById(id).parentElement;
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
        document.getElementById("menuBar").style.width = "30%";
        document.getElementById("menuBar").style.display = "block";
        document.getElementById("menuMain").style.visibility = "hidden";
        document.getElementById("summary").style.marginLeft = "20%";
    }

    closeMenuNav() {
        document.getElementById("menuBar").style.width = "0";
        document.getElementById("menuBar").style.display = "none";
        document.getElementById("menuMain").style.visibility = "visible";
        document.getElementById("summary").style.marginLeft = "0";
    }

    openStaffNav() {
        document.getElementById("staffBar").style.width = "30%";
        document.getElementById("staffBar").style.display = "block";
        document.getElementById("staffMain").style.visibility = "hidden";
        document.getElementById("analytics").style.marginLeft = "20%";
    }

    closeStaffNav() {
        document.getElementById("staffBar").style.width = "0";
        document.getElementById("staffBar").style.display = "none";
        document.getElementById("staffMain").style.visibility = "visible";
        document.getElementById("analytics").style.marginLeft = "0";
    }

    displayOrdersToday() {
        this.displayOrdersTodayBool = !this.displayOrdersTodayBool;
        if (this.displayOrdersTodayBool) {
            document.getElementById("summaryToday").style.display = "none";
            document.getElementById("summaryDetailsToday").style.display = "block";
        } else {
            document.getElementById("summaryToday").style.display = "block";
            document.getElementById("summaryDetailsToday").style.display = "none";
        }
    }

    displayOrdersWeek() {

        this.displayOrdersWeekBool = !this.displayOrdersWeekBool;
        if (this.displayOrdersWeekBool) {
            document.getElementById("summaryWeek").style.display = "none";
            document.getElementById("summaryDetailsWeek").style.display = "block";
        } else {
            document.getElementById("summaryWeek").style.display = "block";
            document.getElementById("summaryDetailsWeek").style.display = "none";
        }
    }

    displayOrdersMonth() {
        this.displayOrdersMonthBool = !this.displayOrdersMonthBool;
        if (this.displayOrdersMonthBool) {
            document.getElementById("summaryMonth").style.display = "none";
            document.getElementById("summaryDetailsMonth").style.display = "block";
        } else {
            document.getElementById("summaryMonth").style.display = "block";
            document.getElementById("summaryDetailsMonth").style.display = "none";
        }
    }
}
