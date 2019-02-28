import { Component, OnInit } from '@angular/core';

import { WaiterService } from './waiter.service';

@Component({
    selector: 'app-waiter',
    templateUrl: './waiter.component.html',
    styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit {

    public orders: any;

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

}
