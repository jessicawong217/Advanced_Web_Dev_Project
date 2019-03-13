const User = require('./user.model');

/**
 * Return a paged list of orders.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;

    User.list({ limit, skip })
        .then(data => res.json(data))
        .catch(e => next(e));
}

/**
 * Handle logging a user in via their pin.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function login(req, res, next) {
    const { pin = null } = req.body;

    if (pin == null) {
        next(new Error('No pin entered.'));
        return;
    }

    User.findOne({ pin: pin })
        .then(user => {
            if (user == null) {
                return Promise.reject(new Error('No user exists with that pin.'));
            }
            res.json({ user: user })
        })
        .catch(e => next(e));
}

/**
 * Create a new user with the posted body data.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function create(req, res, next) {
    var newUser = req.body.user;
    User.findOne({ pin: newUser.pin })
        .then(user => {
            if (user != null) {
                return Promise.reject(new Error('User exists with that pin.'));
            }

            return User.create(newUser);
        })
        .then(createdUser => res.json({ user: createdUser }))
        .catch(e => next(e));
}

/**
 * Update an existing user.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function update(req, res, next) {
    var userId = req.params.id;
    var updatedUser = req.body.user;

    return User.get(userId)
        .then(user => {
            user.name = updatedUser.name;
            user.type = updatedUser.type;
            return user.save();
        })
}

/**
 * Delete a user by its id.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function remove(req, res) {
    const id = req.params.id;
    Menu.findByIdAndRemove(id)
        .then(() => res.json({
            status: 204
        }))
        .catch(e => next(e));
}

/**
 * Seed the user db with static user data.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function seed(req, res, next) {
    var dummyArray = require('./user-seed');

    User.insertMany(dummyArray)
        .then(() => res.json({
            ok: true
        }))
        .catch(e => next(e));
}

module.exports = {
    list,
    login,
    create,
    update,
    remove,
    seed
};
