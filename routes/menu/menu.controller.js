const Menu = require('./menu.model');

/**
 * Return a paged list of menu menu items. 
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Menu.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Seed the menu item db with static menu data.
 * TODO: use a json file to import.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function seed(req, res, next) {
  var dummyArray = [{ name: 'Filet-Mignon', description: '', price: 20.99 }];

  Menu.insertMany(dummyArray)
    .then(() => res.json({ ok: true }))
    .catch(e => next(e));
}

module.exports = {
  list: list,
  seed: seed
};
