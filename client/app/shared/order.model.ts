import { OrderItem } from "./order-item.model";

export class Order {
    constructor(public id: number,
                public tableId: number,
                public status: string,
                public createdAt: Date,
                public items: OrderItem[]
    ){}
}
