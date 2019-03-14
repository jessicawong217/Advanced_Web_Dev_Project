import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const socketconfig: SocketIoConfig = {
    url: environment.socketUrl,
    options: {}
};

/**
 * Service to configure socket connection and handle mapping socket events to
 * useful methods.
 */
@Injectable({
    providedIn: 'root'
})
export class OrderSocketService extends Socket {
    constructor() {
        super(socketconfig);
    }

    /**
     * Observable to return all order-opened events.
     * @returns The order that was opened
     */
    getOrdersOpened() {
        // TODO: type the response.
        return this.fromEvent('order-opened').pipe(
            map((data: any) => data.order)
        );
    }

    getOrdersUpdated() {
        // TODO: type the response.
        return this.fromEvent('order-updated').pipe(
            map((data: any) => data.order)
        );
    }

    /**
     * Observable to return all order-completed events.
     * @returns The order that was completed
     */
    getOrdersCompleted() {
        // TODO: type the response.
        return this.fromEvent('order-completed').pipe(
            map((data: any) => data.order)
        );
    }
}
