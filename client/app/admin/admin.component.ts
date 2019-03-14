import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { UsersService } from '../users/users.service';
import { MenuItem } from "../menu/menu.model";
import { User } from "../users/user.model";
import { Table } from "../shared/models/table.model";
import { TableService } from "../shared/table.service";

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
    newTable: Table = new Table(null, null, null);

    editMenu = false;
    editStaff = false;
    editTables = false;
    menuOpen = false;

    menuItems: MenuItem[];
    tables: Table[];
    users: User[];

    private displayOrdersTodayBool;
    private displayOrdersWeekBool;
    private displayOrdersMonthBool;

    /**
     * Constructor to pass services and modules
     * @param menuService
     * @param usersService
     * @param tableService
     */
    constructor(
        private menuService: MenuService,
        private usersService: UsersService,
        private tableService: TableService
    ) {}

    /**
     * Get data on load
     */
    ngOnInit() {
        this.getMenu();
        this.getUsers();
        this.getTables();
    }

    /**
     * Get all items from the menu
     * @return menu[]
     */
    getMenu() {
        this.menuService.getMenu().subscribe(result => {
            this.menuItems = result;
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
     * Calls table service to get all tables.
     * Maps response to Table array
     */
    getTables() {
        this.tableService.getTables().subscribe(result => {
            this.tables = result;
        });
    }

    openMenuEdit() {
        this.editMenu = true;
        this.editStaff = false;
        this.editTables = false;
        this.menuOpen = true;
    }

    openStaffEdit() {
        this.editStaff = true;
        this.editMenu = false;
        this.editTables = false;
        this.menuOpen = true;
    }

    openTableEdit() {
        this.editTables = true;
        this.editMenu = false;
        this.editStaff = false;
        this.menuOpen = true;
    }

    closeMenu() {
        this.menuOpen = false;
        this.editStaff = false;
        this.editMenu = false;
    }

    addItem(item: MenuItem) {
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
        this.usersService.update(user._id, user)
            .subscribe(() => {
                this.getUsers();
        });
    }

    addTable(table: any) {
        this.tableService.addTable(table)
            .subscribe(() => {
                this.getTables();
            })
    }

    removeTable(id: string) {
        this.tableService.deleteTable(id)
            .subscribe(() => {
                this.getTables();
            });
    }

    updateTable(table: any) {
        this.tableService.updateTable(table._id, table)
            .subscribe(() => {
                this.getTables()
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
