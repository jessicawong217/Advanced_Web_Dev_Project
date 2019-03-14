export class OrderItem {
    constructor(
        public _id: string,
        public menuItemId: string,
        public name: string,
        public price: number,
        public status: string,
        public createdAt: Date
    ) { }
}
