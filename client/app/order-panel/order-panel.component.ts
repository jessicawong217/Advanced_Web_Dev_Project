import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';

import { Order } from '../shared/order.model';
import { OrderItem } from '../shared/order-item.model';
import { OrderService } from '../shared/order.service';

export type PanelType = 'waiter' | 'counter';

@Component({
    selector: 'app-order-panel',
    templateUrl: './order-panel.component.html',
    styleUrls: ['./order-panel.component.css']
})
export class OrderPanelComponent implements OnInit {

    @Input() waiterId: any;

    @Input()
    public set setOrder(order: Order) {
        this.order = order;
        this.setDiscountToZero();
        this.calculateTotal();
    }

    @Input()
    type: PanelType;

    @Output()
    close = new EventEmitter();

    public order: Order;

    public totalNoDiscount: number;

    public totalWithDiscount: number;

    public discountForm: FormGroup;

    /**
     * Counter Comoponent Constructor
     *
     * @param counterService Counter Service
     * @param formBuilder Form Builder
     */
    constructor(
        private formBuilder: FormBuilder,
        private orderService: OrderService,
    ) { }

    ngOnInit() {
        this.createForm();
        this.calculateTotal();
    }

    /**
     * Creates the form
     */
    createForm(): void {
        this.discountForm = this.formBuilder.group({
            discount: this.formBuilder.control(0, [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(3)
            ])
        });
    }

    /**
     * Calculate the total of all prices. Item price * quantity
     */
    calculateTotal() {
        this.totalNoDiscount = this.order.items.reduce(
            (accumulator, element) =>
                element.price + accumulator,
            0
        );
        this.addPromo();
    }

    /**
     * Calculate the discount out of the total price
     */
    addPromo() {
        if (this.discountForm === undefined) {
            return;
        }

        if (this.order.discount !== undefined && this.discountForm.value.discount === 0) {
            this.totalWithDiscount = this.totalNoDiscount - this.order.discount;

        } else {
            this.order.discount = (this.discountForm.value.discount / 100) * this.totalNoDiscount;
            this.totalWithDiscount = this.totalNoDiscount - this.order.discount;
        }
    }

    /**
     * When the order changes, set the discount to 0
     */
    setDiscountToZero() {
        if (this.discountForm === undefined) {
            return;
        }
        this.discountForm.controls.discount.patchValue(0);
    }

    /**
     * Completes the order
     *
     * @param order Order
     */
    completeOrder(order: Order) {
        this.orderService
            .completeOrder(
                order._id,
                JSON.stringify({ discountedValue: this.order.discount }
                )
            ).subscribe(data => {
                console.log(data);
            }, (error) => {
                console.log(error);
            });
    }

    /**
     * Update an order by adding items to it
     *
     * @param order Order
     */
    updateOrder(order: Order) {
        const itemsDummy = [
            {
                menuItemId: 1,
                name: 'Pork',
                price: 20.99,
                status: 'InProgress'
            },
            {
                menuItemId: 2,
                name: 'Fanta',
                price: 3.50,
                status: 'InProgress'
            }
        ];
        this.orderService
            .updateOrder(
                order._id,
                JSON.stringify({ items: itemsDummy }
                )
            ).subscribe(data => {
                console.log(data);
            }, (error) => {
                console.log(error);
            });
    }

    /**
     * Add a new item to the order.
     * @param item The new item.
     */
    addItem(item: OrderItem) {
        this.order.items.push(item);
        this.calculateTotal();
    }

    /**
     * Duplicate an order item and add it to the order.
     * @param item Existing order item.
     */
    duplicateItem(item: OrderItem) {
        const newItem = {
            name: item.name,
            price: item.price,
            menuItemId: item.menuItemId
        } as OrderItem;

        this.order.items.push(newItem);
        this.calculateTotal();
    }

    /**
     * Remove a new item from the order.
     * @param index item index in orders array.
     */
    removeItem(index: number) {
        this.order.items.splice(index, 1);
        this.calculateTotal();
    }

    /*
     * Close side view
     */
    closeClick() {
        this.close.emit();
    }

    /**
     * Creates the receipts and downloads it
     */
    printReceipt() {
        const date = new Date();
        const text = [];
        const lineHeight = 1.2,
            margin = 0.1,
            fontSize = 9,
            ptsPerInch = 72,
            oneLineHeight = (fontSize * lineHeight) / ptsPerInch,
            doc = new jsPDF({
                unit: 'in',
                lineHeight: lineHeight,
                format: 'credit-card'
            }).setProperties({ title: 'Receipt' });

        this.order.items.forEach(element => {
            // const itemPrice = element.price * element.quantity;
            const item =
                '£' +
                element.price.toFixed(2) +
                ' - ' +
                element.name +
                '\n';
            text.push(item.toString());
        });

        doc.setFont('helvetica', 'neue').setFontSize(fontSize);

        // doc.text can now add those lines easily; otherwise, it would have run text off the screen!
        doc.text(text, margin, margin + 4 * oneLineHeight);

        // Calculate the height of the text very simply:
        const textHeight = (text.length * fontSize * lineHeight) / ptsPerInch;

        doc.setFontStyle('bold').text(
            'Table ' + this.order.tableId + ' Receipt',
            1,
            margin + oneLineHeight,
            'center'
        );

        if (this.totalWithDiscount) {
            doc.setFontStyle('normal').text(
                'Discount: £' + this.order.discount.toFixed(2),
                0.9,
                textHeight + 0.8,
                'right'
            );
            doc.setFontStyle('bold').text(
                'Total: £' + this.totalWithDiscount.toFixed(2),
                0.8,
                textHeight + 1,
                'right'
            );
        } else {
            doc.setFontStyle('bold').text(
                'Total: £' + this.totalNoDiscount.toFixed(2),
                0.8,
                textHeight + 1,
                'right'
            );
        }

        // Show total
        doc.setFontStyle('bold').text(
            'Thank you for choosing us.',
            1,
            textHeight + 1.5,
            'center'
        );
        doc.setFontStyle('normal').text(
            'VAT No: 132323 2323 2',
            1,
            textHeight + 1.8,
            'center'
        );
        // Show date
        doc.setFontStyle('italic').text(
            date.toLocaleDateString(),
            1,
            textHeight + 2,
            'center'
        );
        // Receipt Id
        doc.setFontStyle('normal').text(
            '32322123',
            1,
            textHeight + 2.15,
            'center'
        );

        doc.output('dataurlnewwindow');
        // doc.open('receipt.pdf'); // If you want to download it
    }
}
