export type MenuItemCategory = 'Starter' | 'Main' | 'Side' | 'Dessert' | 'Drink';

export class MenuItem {
    constructor(
        public _id: string,
        public id: string,
        public name: string,
        public price: number,
        public category: MenuItemCategory
    ) { }

}

export interface MenuItemViewModel {
    item: MenuItem;
}
