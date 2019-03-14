import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuItem } from "../../menu/menu.model";

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

    addItem(item: MenuItem) {
      this.itemAdded.emit(item);
    }

    updateItem(item: MenuItem) {
      this.itemUpdated.emit(item);
      this.itemEditing = null;
    }

    removeItem(id: string) {
      this.itemRemoved.emit(id);
    }

    enableEditing(id){
        this.itemEditing = id;
    }

}
