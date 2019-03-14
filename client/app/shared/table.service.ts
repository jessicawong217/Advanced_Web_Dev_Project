import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Table } from "./models/table.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TableService {

    constructor(private http: HttpClient) {
    }

    /**
     * Calls API endpoint to get all tables
     */
    getTables(): Observable<any> {
        return this.http.get(`${environment.apiUrl}tables`)
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Create a new table
     * @param table The new table
     */
    addTable(table: Table) {
        return this.http.post(`${environment.apiUrl}tables`, { table })
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }

    /**
     * Delete a table
     * @param  id table id
     */
    deleteTable(id: string) {
        return this.http.delete(`${environment.apiUrl}tables/${id}`)
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );;
    }

    /**
     * Calls API endpoint to update a table
     */
    updateTable(tableId: string, table: Table): Observable<any> {
        return this.http.put(`${environment.apiUrl}tables/${tableId}`, { table })
            .pipe(
                catchError((error: any) => observableThrowError(error))
            );
    }
}
