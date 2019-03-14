var Menu = require('./menu/menu.model');
var Order = require('./orders/order.model');
var User = require('./users/user.model');
var Table = require('./tables/table.model');

var menuSeedData = require('./menu/menu-seed');
var ordersSeedData = require('./orders/order-seed');
var usersSeedData = require('./users/user-seed');
var tablesSeedData = require('./tables/table-seed');

/**
 * Seed the three primary data types. Add the ability to clear the data with the
 * ?clear=true param.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function seed(req, res, next) {
    var { clear = false } = req.query;
    var clearPromise;

    if (!!clear) {
        clearPromise = Promise.all([
            Menu.deleteMany({}).exec(),
            Order.deleteMany({}).exec(),
            User.deleteMany({}).exec(),
            Table.deleteMany({}).exec()
        ]);
    } else {
        clearPromise = Promise.resolve();
    }

    clearPromise
        .then(() =>
            Promise.all([
                Menu.insertMany(menuSeedData),
                Order.insertMany(ordersSeedData),
                User.insertMany(usersSeedData),
                Table.insertMany(tablesSeedData)
            ])
        )
        .then(() => {
            res.json({ ok: true });
        })
        .catch(e => next(e));
}

module.exports = {
    seed
};
