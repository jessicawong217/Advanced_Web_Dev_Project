const Menu = require('./menu.model');

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Menu.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

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
