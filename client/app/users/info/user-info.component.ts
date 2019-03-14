import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';

/**
 * Simple component to display the current user.
 */
@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
    /**
     * User to display. 
     */
    user: User;

    /**
     * 
     * @param usersService Access the users data.
     */
    constructor(private usersService: UsersService) {}

    /**
     * Init the component, gathering the current user.
     */
    ngOnInit() {
        this.user = this.usersService.currentUser;
    }

    /**
     * Log the user out.
     */
    logoutClick() {
        this.usersService.logoutUser();
    }
}
