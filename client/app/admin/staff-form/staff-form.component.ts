import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuItem } from "../../menu/menu.model";
import { User } from "../../users/user.model";

/**
 * Staff Component to handle staff sidebar
 * @param  selector   Staff form
 * @param  templateUrl Staff sidebar HTML
 * @param  styleUrls   Staff sidebar CSS
 */
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

    /**
     * Add new user
     * @param  user New user to be added
     */
    addUser(user: User) {
        this.userAdded.emit(user);
    }

    /**
     * Update an existing user
     * @param  user User info to be updated
     */
    updateUser(user: User) {
        this.userUpdated.emit(user);
        this.userEditing = null;
    }

    /**
     * Remove a user
     * @param  id User id to be searched and removed against
     */
    removeUser(id: string) {
        this.userRemoved.emit(id);
    }

    /**
     * Enable editing of users
     * @param  id User id for editing
     */
    enableEditing(id) {
        this.userEditing = id;
    }

}
