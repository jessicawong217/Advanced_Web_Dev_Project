const Order = require('./order.model');

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Order.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

function seed(req, res, next) {
  var dummyArray = [{ tableId: 1, createdAt: Date.now() }];

  Order.insertMany(dummyArray)
    .then(() => res.json({ ok: true }))
    .catch(e => next(e));
}

module.exports = {
  list: list,
  seed: seed
};
