export enum MenuItemCategory {
    Starter,
    Main,
    Side,
    Dessert,
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
