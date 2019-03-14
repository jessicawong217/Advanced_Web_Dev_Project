import { Component, OnInit } from '@angular/core';

import { MenuService } from '../menu/menu.service';
import { UsersService } from '../users/users.service';
import { MenuItem } from "../menu/menu.model";
import { User } from "../users/user.model";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    newItem: MenuItem = new MenuItem(null, null, null, null);
    newUser: User = new User(null, null, null, null);

    editMenu = false;
    editStaff = false;
    menuOpen = false;

    public menuItems = [];

    public users = [];

    private displayOrdersTodayBool;
    private displayOrdersWeekBool;
    private displayOrdersMonthBool;

    constructor(
        private menuService: MenuService,
        private usersService: UsersService
    ) {}

    ngOnInit() {
        this.getMenu();
        this.getUsers();
    }

    getMenu() {
        this.menuService.getMenu().subscribe(result => {
            this.menuItems = result;
            console.log(this.menuItems)
        });
    }

    getUsers() {
        this.usersService.getUsers().subscribe(result => {
            this.users = result;
        });
    }

    openMenuEdit() {
        this.editMenu = true;
        this.editStaff = false;
        this.menuOpen = true;
    }

    openStaffEdit() {
        this.editStaff = true;
        this.editMenu = false;
        this.menuOpen = true;
    }

    closeMenu() {
        this.menuOpen = false;
        this.editStaff = false;
        this.editMenu = false;
    }

    addItem(item: MenuItem) {
            console.log(item);
            this.menuService.create(item)
                .subscribe(() => {
                    // Reload the menu after the item is added.
                    this.getMenu();
                },
                () => {
                    console.log('failed');
                }
            );
    }

    removeItem(id: string) {
        this.menuService.delete(id)
            .subscribe(() => {
                this.getMenu();
            });
    }

    updateItem(item: MenuItem) {
        this.menuService.update(item._id, item).subscribe(() => {
        });
    }

    addUser(user: User) {
        this.usersService.create(user)
            .subscribe(() => {
                // Reload the users after the user is added
                this.getUsers();
            }, () => {
                console.log('failed');
            });
    }

    removeUser(id: string) {
        this.usersService.delete(id)
            .subscribe(() => {
                this.getUsers();
            });
    }

    updateUser(user: User) {
        //TODO: update user
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
