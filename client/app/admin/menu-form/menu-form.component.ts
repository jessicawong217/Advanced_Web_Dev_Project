import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuItem } from "../../menu/menu.model";

/**
 * Menu Component to handle the menu sidebar
 * @param  {selector   [description]
 * @param  templateUrl Menu sidebar HTML
 * @param  styleUrls   Menu sidebar CSS
 */
@Component({
    selector: 'app-menu-form',
    templateUrl: './menu-form.component.html',
    styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

    @Input() formType: string;

    @Input() item: MenuItem;

    @Output() itemAdded = new EventEmitter<MenuItem>();

    @Output() itemUpdated = new EventEmitter<MenuItem>();

    @Output() itemRemoved = new EventEmitter<string>();

    itemEditing: number;

    constructor() { }

    ngOnInit() {
    }

    /**
     * Add an item to the menu
     * @param  item New item to be added
     */
    addItem(item: MenuItem) {
        this.itemAdded.emit(item);
    }

    /**
     * Edit an item from the menu
     * @param  item Menu item to be edited
     */
    updateItem(item: MenuItem) {
        this.itemUpdated.emit(item);
        this.itemEditing = null;
    }

    /**
     * Remove an item from the menu
     * @param  id Menu item id to be removed
     */
    removeItem(id: string) {
        this.itemRemoved.emit(id);
    }

    /**
     * Option to enable the editing of an item
     * @param  id Item id to be edited
     */
    enableEditing(id) {
        this.itemEditing = id;
    }

}
