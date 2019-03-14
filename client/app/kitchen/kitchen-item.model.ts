import { OrderItem } from '../shared/models/order-item.model';

export class KitchenItem extends OrderItem {
    orderId: string;
    tableId: number;
}
