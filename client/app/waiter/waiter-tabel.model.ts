import { Table } from '../shared/models/table.model';
import { Order } from '../shared/models/order.model';

export class WaiterTable extends Table {
    public order: Order;

    public orderId: string;
}
