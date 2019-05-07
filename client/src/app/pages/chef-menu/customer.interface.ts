export interface Menu {
    chefid: string;
    menu: MenuItem[];
}

export interface MenuItem {
    dish: string;
    cost: number;
}