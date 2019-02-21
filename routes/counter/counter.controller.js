const Counter = require('./counter.model');

/**
 * Return a paged list of counter items. 
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Counter.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Return a counter item. 
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function item(req, res, next) {

    Counter.findById({
        _id: req.params.id
    })
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Return all items for a specific period of time. 
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function billsForPeriodOfTime(req, res, next) {
    Counter.find({
        date_time: {
            $gte: req.body.from,
            $lt: req.body.to
        }
    })
        .then(data => res.json(data))
        .catch(e => next(e));
}

function saveBill(req, res, next) {
    let newBill = new Counter({
        order_id: req.body.orderId,
        total: req.body.total,
        date_time: req.body.dateTime
    });

    newBill.save((err, bill) => {
        if (err) {
            res.status(422).json(err);
        } else {
            res.json(bill);
        }
    });
}

/**
 * Seed the counter item db with static counter data.
 * TODO: use a json file to import.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function seed(req, res, next) {

    var dummyArray = [
        {
            order_id: '1',
            total: 300,
            date_time: new Date(Date.now())
        },
        {
            order_id: '33232',
            total: 100,
            date_time: new Date(Date.now())
        },
        {
            order_id: '32311',
            total: 1002,
            date_time: new Date(Date.now())
        }
    ];

    Counter.insertMany(dummyArray)
        .then(() => res.json({ ok: true }))
        .catch(e => next(e));
}

module.exports = {
    list: list,
    item: item,
    billsForPeriodOfTime: billsForPeriodOfTime,
    seed: seed,
    saveBill: saveBill
};
