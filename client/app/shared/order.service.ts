import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Order } from "./order.model";

@Injectable({
    providedIn: "root"
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    getOrders(): Observable<any> {
        return this.http.get("/api/orders/in-progress")
            .pipe(
                map((response: any) => this.toOrderArray(response)),
                catchError((error: any) => observableThrowError(error))
            );
    }


    toOrderArray(response: any): Order[] {
        const orders = [];

        for (let i = 0; i < response.length; i++) {
            orders.push(new Order(
                response[i]._id,
                response[i].tableId,
                response[i].status,
                response[i].createdAt,
                response[i].items
            ));
        }
        return orders;
    }
}
