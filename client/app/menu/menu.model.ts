export enum MenuItemCategory {
    Food,
    Drink
}

export class MenuItem {
    constructor(
        public _id: string,
        public name: string,
        public price: number,
        public category: MenuItemCategory
    ) { }
}

export interface MenuItemViewModel {
    item: MenuItem;
}
