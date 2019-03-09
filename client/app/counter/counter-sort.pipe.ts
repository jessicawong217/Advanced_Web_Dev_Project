import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',
    pure: false
})
export class CounterSortPipe implements PipeTransform {

    /**
     * Sorts items based on a status. InProgress first
     */
    transform(array: any, field: string): any[] {
        if (!Array.isArray(array)) {
            return;
        }

        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return 1;
            } else if (a[field] > b[field]) {
                return -1;
            } else {
                return 0;
            }
        });

        return array;
    }
}
