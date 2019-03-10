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
 * Seed the orders db with static data.
 * TODO: use a json file to import.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function seed(req, res, next) {
    var dummyArray = require('./order-seed');

    Order.insertMany(dummyArray)
        .then(() => res.json({ ok: true }))
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
    var dicountedValue = req.body.discountedValue;

    return Order.getById(orderId)
        .then(order => {
            order.complete(dicountedValue);
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
 * Handle creating a new order.
 * TODO: validate request body.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function create(req, res, next) {
    const order = req.body.order;

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
    seed,
    create,
    complete
};
