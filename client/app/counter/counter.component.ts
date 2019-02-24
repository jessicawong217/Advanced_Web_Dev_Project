import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CounterService } from './counter.service';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

    /** Table Object */
    // @Input() table: any;

    // dummy data for input table
    public table = {
        id: 1,
        table_number: 2

    };

    // dummy data for order
    public order = [
        {
            name: 'Chicken Soup',
            quantity: 1,
            price: 7
        },
        {
            name: 'Curry',
            quantity: 2,
            price: 12
        },
    ];

    public totalNoDiscount: number;

    public totalWithDiscount: number;

    public discountForm: FormGroup;

    public dicountedValue: number;

    public showView = true;

    /**
     * Counter Comoponent Constructor
     *
     * @param counterService Counter Service
     * @param formBuilder Form Builder
     */
    constructor(
        protected counterService: CounterService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.createForm();
        this.calculateTotal();

        this.dicountedValue = 0;
    }

    /**
    * Creates the form
    */
    createForm(): void {
        this.discountForm = this.formBuilder.group({
            discount: this.formBuilder.control(0, [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(3),
            ])
        });
    }

    /**
     * Calculate the total of all prices. Item price * quantity
     */
    calculateTotal() {
        const prices = [];
        this.order.forEach(element => {
            prices.push(element.price * element.quantity);
        });

        this.totalNoDiscount = prices.reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    /**
     * Calculate  the discount out of the total price
     */
    addPromo() {
        const discountValue = this.discountForm.controls.discount.value;
        this.dicountedValue = (discountValue / 100) * this.totalNoDiscount;

        this.totalWithDiscount = (this.totalNoDiscount - this.dicountedValue);
    }

    /**
     * Show or Hide Order panel
     * @param boolean Value
     */
    show(val: boolean) {
        this.showView = val;
    }

    completeOrder() {
        // TO DO: change table status from busy to available again.
        // Change order status to done
    }

    printReceipt() {

    }

}
