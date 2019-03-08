export enum MenuItemCategory {
    Food,
    Drink
}

export interface MenuItem {
    name: string;
    price: number;
    category: MenuItemCategory;
}

export interface MenuItemViewModel {
    item: MenuItem;
}
