// export enum MenuItemCategory {
//     ,
//     ,
//     ,
//     ,
//     Drink
// }

export type MenuItemCategory = 'Starter' | 'Main' | 'Side' | 'Dessert' | 'Drink';

<<<<<<< HEAD
export interface MenuItem {
    _id: number;
    id: number;
    name: string;
    price: number;
    category: MenuItemCategory;
=======
export class MenuItem {
    constructor(
        public _id: string,
        public name: string,
        public price: number,
        public category: MenuItemCategory
    ) { }
>>>>>>> f289149939e27f8e4767b1e005b8db2e16f962ad
}

export interface MenuItemViewModel {
    item: MenuItem;
}
