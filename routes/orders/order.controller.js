const Order = require('./order.model');

/**
 * Return a paged list of orders.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Order.list({ limit, skip })
        .then(data => res.json(data))
        .catch(e => next(e));
}

/**
 * Return a list of incomplete orders.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function listInProgress(req, res, next) {
    Order.getByStatus("InProgress")
        .then(data => res.json(data))
        .catch(e => next(e));
}

/**
 * Return total for a period of time
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function totalForTimePeriod(req, res, next) {
    Order.getByDates(req.body.from, req.body.to)
        .then(data => {
            var totalForTimePeriod = data.reduce(
                (accumulator, element) =>
                    element.total + accumulator,
                0
            )

            var totalObj = new Object();

            totalObj.total = totalForTimePeriod;

            res.json(totalObj)
        })
        .catch(e => next(e));
}

/**
 * Handle completing an existing order.
 * TODO: validate there is no pending order items?
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function complete(req, res, next) {
    var orderId = req.params.id;
    var dicountedValue = req.body.discount;
    var total = req.body.total;

    if (dicountedValue == null) {
        throw new Error('No discount data passed');
    }

    return Order.getById(orderId)
        .then(order => {
            order.complete(dicountedValue, total);
            return order.save();
        })
        .then(completedOrder => {
            const result = { order: completedOrder };
            res.io.emit('order-completed', result);
            res.json(result);
        })
        .catch(e => next(e));
}

/**
 * Handle updating an existing order.
 * Complete a single item on an order.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function update(req, res, next) {
    var orderId = req.params.id;
    var items = req.body.items;

    if (items == null || items.length < 1) {
        throw new Error('No discount data passed');
    }

    return Order.addItems(orderId, items)
        .then(updateOrder => {
            const result = { order: updateOrder };
            res.io.emit('order-updated', result);
            res.json(result);
        })
        .catch(e => next(e));
}

/**
 * Complete a single item on an order.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function completeItem(req, res, next) {
    var orderId = req.params.id;
    var itemId = req.params.itemId;

    return Order.getById(orderId)
        .then(order => {
            order.completeItem(itemId);
            return order.save();
        })
        .then(updatedOrder => {
            const result = { order: updatedOrder };
            res.io.emit('order-updated', result);
            res.json(result);
        })
        .catch(e => next(e));
}

/**
 * Complete all remaining items on an order.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function completeAllItems(req, res, next) {
    var orderId = req.params.id;

    return Order.getById(orderId)
        .then(order => {
            order.completeAllItems();
            return order.save();
        })
        .then(updatedOrder => {
            const result = { order: updatedOrder };
            res.io.emit('order-updated', result);
            res.json(result);
        })
        .catch(e => next(e));
}

/**
 * Handle creating a new order.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function create(req, res, next) {
    const order = req.body.order;

    order.status = "InProgress";

    if (order == null) {
        throw new Error('No order data passed');
    }

    return Order.create(order)
        .then(createdOrder => {
            const result = { order: createdOrder };
            res.io.emit('order-opened', result);
            res.json(result);
        })
        .catch(e => next(e));
}

module.exports = {
    list,
    listInProgress,
    create,
    complete,
    update,
    completeItem,
    completeAllItems,
    totalForTimePeriod
};
