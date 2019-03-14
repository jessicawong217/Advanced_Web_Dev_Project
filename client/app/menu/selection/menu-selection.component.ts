import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderItem } from 'client/app/shared/order-item.model';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

import { MenuItem } from '../menu.model';
import { MenuService } from '../menu.service';

@Component({
    selector: 'app-menu-selection',
    templateUrl: './menu-selection.component.html',
    styleUrls: ['./menu-selection.component.css']
})
export class MenuSelectionComponent implements OnInit {
    /**
     * New item added event.
     */
    @Output()
    itemAdded = new EventEmitter<Partial<OrderItem>>();

    /**
     * List of displayed menu items for selection.
     */
    items: {[cat: string] : MenuItem[]} = {};

    categories = ['Starter', 'Main', 'Side', 'Dessert', 'Drink'];

    selectedCategory = 'Starter';

    /**
     * Search string subject.
     */
    searchSubject$ = new Subject<string>();

    constructor(private menuService: MenuService) { }

    /**
     * Configure the subscribe to the search subjext and load the intial list of
     * items.
     */
    ngOnInit() {
        // Debounce any search to decrease calls to the API.
        this.searchSubject$
            .pipe(
                debounceTime(1000),
                switchMap(v => this.menuService.getMenu(1, 50, v)),
                tap(items => (this.items = this.formatItems(items)))
            )
            .subscribe();

        // Load the initial list of menu items.
        this.menuService.getMenu().subscribe(items => (this.items = this.formatItems(items)));
    }

    formatItems(items: MenuItem[]) {
        return items.reduce((acc, item) => {
            var currentCatItems = acc[item.category] ? acc[item.category] : [];
            currentCatItems.push(item);
            acc[item.category] = currentCatItems;
            return acc;
        }, {} as { [cat: string]: MenuItem[] });
    }

    /**
     * Trigger event emitter to add a new item to the order..
     * @param item The new menu item to add.
     */
    addItemClick(item: MenuItem) {
        this.itemAdded.emit({ name: item.name, price: item.price, menuItemId: item.id });
    }

    /**
     * Add the newly updated search value to the search subject to be debounced.
     * @param event Input event.
     */
    searchInput(event: { target: HTMLInputElement }) {
        this.searchSubject$.next(event.target.value);
    }
}
