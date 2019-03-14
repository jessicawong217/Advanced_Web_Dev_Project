import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './admin.service';
import { MenuService } from '../menu/menu.service';
import { MenuItemCategory, MenuItem } from '../menu/menu.model';
import { UsersService } from '../users/users.service';

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

/**
 * Constructor to pass services and modules
 * @param protectedadminService
 * @param menuService
 * @param usersService
 * @param formBuilder
 */
    constructor(
        protected adminService: AdminService,
        private menuService: MenuService,
        private usersService: UsersService,
        private formBuilder: FormBuilder
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
            this.menu = result;
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
     * Track this.menu[] data and update
     * @param  index index of items
     * @param  item  each item of menu
     */
    identifyMenu(index, item) {
        return index;
    }

    /**
     * Track this.users[] data and update
     * @param  index index of users
     * @param  item  each user
     */
    identifyUsers(index, item) {
        return index;
    }

    /**
     * Add new item to menu
     * @return Item created or failed to do so
     */
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

    /**
     * Remove an item from the menu database and list
     * @param  id
     */
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

    /**
     * Add a user to database
     */
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

    /**
     * Remove a user from the database and list
     * @param  id
     */
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

    /**
     * Open the menu side bar and adjust style
     */
    openMenuNav() {
        document.getElementById("menuBar").style.width = "30%";
        document.getElementById("menuBar").style.display = "block";
        document.getElementById("menuMain").style.visibility = "hidden";
        document.getElementById("summary").style.marginLeft = "20%";
    }

    /**
     * Close the menu side bar and adjust style
     */
    closeMenuNav() {
        document.getElementById("menuBar").style.width = "0";
        document.getElementById("menuBar").style.display = "none";
        document.getElementById("menuMain").style.visibility = "visible";
        document.getElementById("summary").style.marginLeft = "0";
    }

    /**
     * Open the staff side bar and adjust style
     */
    openStaffNav() {
        document.getElementById("staffBar").style.width = "30%";
        document.getElementById("staffBar").style.display = "block";
        document.getElementById("staffMain").style.visibility = "hidden";
        document.getElementById("analytics").style.marginLeft = "20%";
    }

    /**
     * Close the staff side bar and adjust style
     */
    closeStaffNav() {
        document.getElementById("staffBar").style.width = "0";
        document.getElementById("staffBar").style.display = "none";
        document.getElementById("staffMain").style.visibility = "visible";
        document.getElementById("analytics").style.marginLeft = "0";
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
