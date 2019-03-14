import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})
export class TableFormComponent implements OnInit {

    @Input() formType: string;

    @Input() table: any;

    @Output() tableAdded = new EventEmitter<any>();

    @Output() tableUpdated = new EventEmitter<any>();

    @Output() tableRemoved = new EventEmitter<string>();

    tableEditing: number;

    constructor() { }

    ngOnInit() {
    }

    addTable(table: any) {
        this.tableAdded.emit(table);
    }

    updateTable(table: any) {
        this.tableUpdated.emit(table);
        this.tableEditing = null;
    }

    removeTable(id: string) {
        this.tableRemoved.emit(id);
    }

    enableEditing(id){
        this.tableEditing = id;
    }

}
