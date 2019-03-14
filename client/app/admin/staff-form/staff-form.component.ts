import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuItem } from "../../menu/menu.model";
import { User } from "../../users/user.model";

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css']
})
export class StaffFormComponent implements OnInit {

    @Input() formType: string;

    @Input() user: User;

    @Output() userAdded = new EventEmitter<User>();

    @Output() userUpdated = new EventEmitter<User>();

    @Output() userRemoved = new EventEmitter<string>();

    userEditing: number;

  constructor() { }

  ngOnInit() {
  }

    addUser(user: User) {
        this.userAdded.emit(user);
    }

    updateUser(user: User) {
        this.userUpdated.emit(user);
        this.userEditing = null;
    }

    removeUser(id: string) {
        this.userRemoved.emit(id);
    }

    enableEditing(id){
        this.userEditing = id;
    }

}
