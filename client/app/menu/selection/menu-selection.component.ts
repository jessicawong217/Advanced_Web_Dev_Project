import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OrderItem } from 'client/app/shared/order-item.model';
import { MenuService } from '../menu.service';
import { MenuItem } from '../menu.model';

@Component({
    selector: 'app-menu-selection',
    templateUrl: './menu-selection.component.html',
    styleUrls: ['./menu-selection.component.css']
})
export class MenuSelectionComponent implements OnInit {
    @Output()
    itemAdded = new EventEmitter<Partial<OrderItem>>();

    items: MenuItem[];

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.menuService.getMenu().subscribe(items => (this.items = items));
    }

    addItemClick(item: MenuItem) {
        this.itemAdded.emit({ name: item.name, price: item.price });
    }
}
