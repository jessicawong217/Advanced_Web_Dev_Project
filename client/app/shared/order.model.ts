import { OrderItem } from "./order-item.model";

export class Order {
    constructor(public _id: number,
                public tableId: number,
                public status: string,
                public createdAt: Date,
                public items: OrderItem[]
    ){}
}
