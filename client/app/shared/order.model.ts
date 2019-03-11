import { OrderItem } from './order-item.model';

export class Order {
    constructor(
        public _id: string,
        public tableId: number,
        public status: string,
        public createdAt: Date,
        public finishedAt: Date,
        public items: OrderItem[]
    ) { }
}
