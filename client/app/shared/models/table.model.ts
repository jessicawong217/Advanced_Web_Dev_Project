export class Table {
    constructor(public _id: string,
                public id: number,
                public capacity: number) {}
}

export interface TableViewModel {
    table: Table;
}
