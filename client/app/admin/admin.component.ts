import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { UsersService } from '../users/users.service';
import { MenuItem } from "../menu/menu.model";
import { User } from "../users/user.model";

/**
 * Class to build admin view
 * @param  selector admin app
 * @param  templateUrl HTML page
 * @param  styleUrls   CSS stylesheet
 */
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    newItem: MenuItem = new MenuItem(null, null, null, null, null);
    newUser: User = new User(null, null, null, null);

    editMenu = false;
    editStaff = false;
    menuOpen = false;

    public menuItems = [];

    public users = [];

    private displayOrdersTodayBool;
    private displayOrdersWeekBool;
    private displayOrdersMonthBool;

    /**
     * Constructor to pass services and modules
     * @param protectedadminService
     * @param menuService
     * @param usersService
     * @param formBuilder
     */
    constructor(
        private menuService: MenuService,
        private usersService: UsersService
    ) { }

    /**
     * Get data on load
     */
    ngOnInit() {
        this.getMenu();
        this.getUsers();
    }

    /**
     * Get all items from the menu
     * @return menu[]
     */
    getMenu() {
        this.menuService.getMenu().subscribe(result => {
            this.menuItems = result;
            console.log(this.menuItems)
        });
    }

    /**
     * Get all users
     * @return users[]
     */
    getUsers() {
        this.usersService.getUsers().subscribe(result => {
            this.users = result;
        });
    }

    /**
     * Open Menu nav bar
     */
    openMenuEdit() {
        this.editMenu = true;
        this.editStaff = false;
        this.menuOpen = true;
    }

    /**
     * Open Staff nav bar
     */
    openStaffEdit() {
        this.editStaff = true;
        this.editMenu = false;
        this.menuOpen = true;
    }

    /**
     * Close Menu nav bar
     */
    closeMenu() {
        this.menuOpen = false;
        this.editStaff = false;
        this.editMenu = false;
    }

    /**
     * Add item to menu
     * @param  item New menu item
     */
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

    /**
     * Remove item from the menu
     * @param  id Menu item id to be removed
     */
    removeItem(id: string) {

        this.menuService.delete(id)
            .subscribe(() => {
                this.getMenu();
            });
    }

    /**
     * Update menu item with new info
     * @param  item Menu item to be edited
     */
    updateItem(item: MenuItem) {
        this.menuService.update(item._id, item).subscribe(() => {
        });
    }

    /**
     * Add new user
     * @param  user New user to be added
     */
    addUser(user: User) {
        this.usersService.create(user)
            .subscribe(() => {
                // Reload the users after the user is added
                this.getUsers();
            }, () => {
                console.log('failed');
            });
    }

    /**
     * Remove existing user
     * @param  id User's id to be removed
     */
    removeUser(id: string) {
        this.usersService.delete(id)
            .subscribe(() => {
                this.getUsers();
            });
    }

    /**
     * Update user with new info
     * @param  user User to be updated
     */
    updateUser(user: User) {
        this.usersService.update(user._id, user).subscribe(() => {
        });
    }

    /**
     * Display revenue from today
     */
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

    /**
     * Display revenue from week
     */
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

    /**
     * Display revenue from month
     */
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
