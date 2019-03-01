import { Component, OnInit } from '@angular/core';

import { WaiterService } from './waiter.service';

@Component({
    selector: 'app-waiter',
    templateUrl: './waiter.component.html',
    styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit {

    // Dummy data to pass into order panel component
    public tableId = 2;
    public waiterId = 1;

    public orders: any;

    public showView = true;

    constructor(
        protected waiterService: WaiterService
    ) { }

    ngOnInit() {
        this.test();
    }

    test(): void {
        this.waiterService
            .getCounter()
            .subscribe((data) => {
                console.log(data);
            }, () => {
                // Dismiss
            });
    }

    // TODO: change this to show the order panel
    // if a table is selected
    show(val: boolean) {
        this.showView = val;
    }

}
