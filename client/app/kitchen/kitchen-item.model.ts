import { OrderItem } from '../shared/order-item.model';

export class KitchenItem extends OrderItem {
    orderId: string;
    tableId: number;
}
