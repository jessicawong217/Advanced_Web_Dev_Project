export class OrderItem {
    constructor(
        public _id: string,
        public name: string,
        public menuId: string,
        public price: number,
        public quantity: number
    ) { }
}
