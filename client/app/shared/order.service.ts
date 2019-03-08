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
                catchError((error: any) => observableThrowError(error))
            );
    }
}
