export enum MenuItemCategory {
    Starter,
    Main,
    Side,
    Dessert,
    Drink
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: MenuItemCategory;
}

export interface MenuItemViewModel {
    item: MenuItem;
}
