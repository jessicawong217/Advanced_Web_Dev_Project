import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AdminService } from './admin.service';
import { MenuService } from '../menu/menu.service';
import { MenuItemCategory } from '../menu/menu.model';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    item : {
        id: number,
        name: string,
        price: number,
        category: MenuItemCategory
    };

    public newItem = new MenuItem;
    public itemName = new FormControl('itemName');
    itemPrice = new FormControl('itemPrice');
    itemCategory = new FormControl('itemCategory');

    public menu = [];

    public staff = [
        {
            firstname: 'Klaus',
            surname: 'Logan',
            role: 'Waiter'
        },
        {
            firstname: 'Susanne',
            surname: 'Smith',
            role: 'Waiter'
        },
        {
            firstname: 'Joanne',
            surname: 'Lee',
            role: 'Manager'
        },
        {
            firstname: 'John',
            surname: 'McGregor',
            role: 'Manager'
        },
        {
            firstname: 'Lucy',
            surname: 'McCabe',
            role: 'Kitchen'
        },
        {
            firstname: 'James',
            surname: 'Peter',
            role: 'Kitchen'
        },
        {
            firstname: 'Amanda',
            surname: 'Hogen',
            role: 'Waiter'
        },
        {
            firstname: 'Lewis',
            surname: 'Marino',
            role: 'Waiter'
        }
    ];

    private displayOrdersTodayBool;
    private displayOrdersWeekBool;
    private displayOrdersMonthBool;

    constructor(
        protected adminService: AdminService,
        private menuService: MenuService,
        private formControl: FormControl
    ) { }

    ngOnInit() {
        this.getMenu();
    }

    getMenu() {
        this.menuService.getMenu().subscribe(result => {
            this.menu = result;
        })
    }

    updateMenu() {
        var table = document.getElementById("menu tr");
        for (var i = 1, row; row = table[i]; i++) {
            //iterate through rows
            //rows would be accessed using the "row" variable assigned in the for loop
            for (var j = 0, col; col = row[j]; j++) {
                console.log(col[j]);
            }
        }
        //this.menuService.update(itemId, menuItem);
    }

    addItem() {
        //var itemName = this.removeBrackets(document.getElementById("itemName").innerHTML);
        //var itemPrice = this.removeBrackets(document.getElementById("itemPrice").innerHTML);
        //var itemCategory = <HTMLInputElement>(document.getElementById("menuCategorySelect").value);

        console.log(this.itemName + " : " + this.itemPrice + " : " + this.itemCategory);
        if (this.isNumeric(this.itemPrice)) {
            var newItem = this.item;
            var newId = (Math.max.apply(Math, this.menu.map(function(o) { return o.id; }))) + 1;
            newItem.id = newId;
            newItem.name = this.itemName;
            newItem.price = this.itemPrice;
            newItem.category = this.itemCategory;
            //var newItem = { id: this.newId, name: this.itemName, price: this.itemPrice, category: this.itemCategory };
            this.menuService.create(newItem);
            this.getMenu();
        } else {
            alert("Item price is not a valid number. Try again and add to menu.");
        }
    }

    removeItem(id_) {
        var element = document.getElementById(id_);
        element.remove();
        this.menuItem.remove(id_);
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
