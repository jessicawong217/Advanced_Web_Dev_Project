const express = require('express');
const orderCtrl = require('./order.controller');

const router = express.Router();

router
    .route('/')
    /** GET /api/orders - Get list of orders */
    .get(orderCtrl.list)
    /** POST /api/orders - Create new order */
    .post(orderCtrl.create);

router
    .route('/in-progress')
    /** GET /api/orders/in-progress - Get all orders that aren't completed */
    .get(orderCtrl.listInProgress);

router
    .route('/:id/complete')
    /** POST /api/orders/:id/complete - Mark an order as completed */
    .post(orderCtrl.complete);

router
    .route('/:id')
    /** PATCH /api/orders/:id - Add items to an order*/
    .patch(orderCtrl.update);

router
    .route('/:id/items/complete')
    /** POST /api/orders/:id/items/complete - Mark all order item as completed */
    .post(orderCtrl.completeAllItems);

router
    .route('/:id/items/:itemId/complete')
    /** POST /api/orders/:id/items/:itemId/complete - Mark an order item as completed */
    .post(orderCtrl.completeItem);

router
    .route('/total-time')
    /** 
     * POST /api/orders/total-time - Get the total for Completed orders over
     * over a period of time
     */
    .post(orderCtrl.totalForTimePeriod);

module.exports = router;
