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
 * Seed the orders db with static data.
 * TODO: use a json file to import.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function seed(req, res, next) {
    var dummyArray = [
        {
            tableId: 1,
            items: [
                {
                    name: "Curry Chicken",
                    quantity: 1,
                    price: 19.99
                },
                {
                    name: "Chicken Soup",
                    quantity: 2,
                    price: 7.29,
                }
            ],
            createdAt: Date.now(),
            status: "in progress"
        },
        {
            tableId: 2,
            items: [
                {
                    name: "Curry Beef",
                    quantity: 1,
                    price: 25.78
                },
                {
                    name: "Chicken Soup",
                    quantity: 3,
                    price: 7.29,
                }
            ],
            createdAt: Date.now(),
            status: "in progress"
        }
    ];

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
        .then(createdOrder => res.json({ order: createdOrder }))
        .catch(e => next(e));
}

module.exports = {
    list: list,
    seed: seed,
    create: create
};
