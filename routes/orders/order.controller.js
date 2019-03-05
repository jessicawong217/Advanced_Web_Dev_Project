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
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Return a list of incomplete orders.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function listInProgress(req, res, next) {
    Order.get("InProgress")
        .then(users => res.json(users))
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
 * Handle creating a new order.
 * TODO: validate request body.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function create(req, res, next) {
    const order = req.body.order;
    order.status = 'InProgress';

    return Order.create(order)
        .then(createdOrder => {
            const result = { order: createdOrder };
            res.io.emit('order-opened', result);
            res.json(result);
        })
        .catch(e => next(e));
}

module.exports = {
    list: list,
    listInProgress: listInProgress,
    seed: seed,
    create: create
};
