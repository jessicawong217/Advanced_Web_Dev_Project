import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OrderItem } from 'client/app/shared/order-item.model';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-menu-selection',
    templateUrl: './menu-selection.component.html',
    styleUrls: ['./menu-selection.component.css']
})
export class MenuSelectionComponent implements OnInit {
    @Output()
    itemAdded = new EventEmitter<Partial<OrderItem>>();

    items: MenuItem[];

    searchSubject$ = new Subject<string>();

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.searchSubject$
            .pipe(
                debounceTime(1000),
                switchMap(v => this.menuService.getMenu(1, 50, v)),
                tap(items => (this.items = items))
            )
            .subscribe();

        // Load the initial list of menu items.
        this.menuService.getMenu().subscribe(items => (this.items = items));
    }

    addItemClick(item: MenuItem) {
        this.itemAdded.emit({ name: item.name, price: item.price });
    }

    searchInput(event: { target: HTMLInputElement }) {
        this.searchSubject$.next(event.target.value);
    }
}
