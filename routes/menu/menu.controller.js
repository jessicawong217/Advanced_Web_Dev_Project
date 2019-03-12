const Menu = require('./menu.model');

/**
 * Return a paged list of menu items.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function list(req, res, next) {
    const {
        limit = 50, skip = 0
    } = req.query;
    Menu.list({
            limit,
            skip
        })
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Get a single menu item by id.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function get(req, res, next) {
    const id = req.params.id;

    Menu.get(id)
        .then(menuItem => res.json({
            item: menuItem
        }))
        .catch(e => next(e));
}

/**
 * Create a new menu item.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function create(req, res, next) {
    const newItem = req.body.item;

     Menu.findOne({}, {}, { sort: { 'id': -1 } })
        .then((lastItem) => {
            let lastId = 1;
            if (lastItem != null && !!lastItem.id) {
                lastId = lastItem.id + 1;
            }
            newItem.id = lastId;
            return Menu.create(newItem);
                
        })
         .then(menuItem => res.json({
             item: menuItem
         }))
         .catch(e => next(e));
    
}

/**
 * Update a menu item by its id. Requires all 3 menu details to update.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function update(req, res, next) {
    const id = req.params.id;
    const modifiedItem = req.body.item;

    Menu.get(id)
        .then(menuItem => {
            menuItem.id = modifiedItem.id;
            menuItem.name = modifiedItem.name;
            menuItem.price = modifiedItem.price;
            menuItem.category = modifiedItem.category;
            return menuItem.save();
        })
        .then(menuItem => res.json({
            item: menuItem
        }))
        .catch(e => next(e));
}

/**
 * Delete a menu item by its id.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function remove(req, res, next) {
    const id = req.params.id;
    Menu.findOneAndRemove({_id: id})
    .then(() => res.json({
        status: 204
    }))
        .catch(e => next(e));
}

/**
 * Seed the menu item db with static menu data.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function seed(req, res, next) {
    var dummyArray = require('./menu-seed');

    Menu.insertMany(dummyArray)
        .then(() => res.json({
            ok: true
        }))
        .catch(e => next(e));
}

module.exports = {
    list,
    seed,
    get,
    create,
    update,
    remove
};
