import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MenuItem, MenuItemViewModel } from './menu.model';

/**
 * Service to handle interactions with menu items.
 */
@Injectable({
    providedIn: 'root'
})
export class MenuService {
    constructor(private httpClient: HttpClient) {}

    /**
     * Get paged list of menu items.
     */
    getMenu(page = 1, perpage = 50, query: string = null) {
        var queryParams = { skip: 0 + '', limit: perpage + '' } as {
            [param: string]: string;
        };

        if (page > 1) {
            queryParams.skip = page * perpage + '';
        }

        if (!!query) {
            queryParams.query = query;
        }

        return this.httpClient.get<MenuItem[]>(environment.apiUrl + 'menu', {
            params: queryParams
        });
    }

    /**
    //  * Get a single menu item.
     * @param id Id of item.
     */
    getById(id: string) {
        return this.httpClient.get<MenuItemViewModel>(
            environment.apiUrl + 'menu/' + id
        );
    }

    /**
     *
     * @param id Menu item Id.
     * @param item Updated item details.
     */
    update(id: string, item: MenuItem) {
        return this.httpClient.put<MenuItemViewModel>(
            environment.apiUrl + 'menu/' + id,
            {
                item: item
            }
        );
    }

    /**
     * Create a new menu item.
     * @param item The new menu item.
     */
    create(item: MenuItem) {
        return this.httpClient.post<MenuItemViewModel>(
            environment.apiUrl + 'menu',
            {
                item: item
            }
        );
    }
}
