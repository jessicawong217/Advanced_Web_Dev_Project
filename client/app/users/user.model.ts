export type UserType = 'Waiter' | 'Manager' | 'Admin';

export class User {
    constructor(
        public _id: string,
        public name: string,
        public type: UserType,
        public pin: string
    ) {}
}

export interface UserViewModel {
    user: User;
}
