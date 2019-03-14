const Table = require('./table.model');

/**
 * Return a list of tables.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;

    Table.list({ limit, skip })
        .then(data => res.json(data))
        .catch(e => next(e));
}

/**
 * Create a new table with the posted body data.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function create(req, res, next) {
    var newTable = req.body.table;

    return Table.create(newTable)
        .then(createdTable => res.json({ table: createdTable }))
        .catch(e => next(e));
}

/**
 * Uopate a table by its id.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function update(req, res, next) {
    var tableId = req.params.id;
    var updatedTable = req.body.table;

    return Table.findById(tableId)
        .then(table => {
            table.id = updatedTable.id;
            table.capacity = updatedTable.capacity;
            return table.save();
        })
        .then(updatedTable => res.json({ table: updatedTable }))
        .catch(e => next(e));
}

/**
 * Delete a table by its id.
 * @param {*} req The express request object.
 * @param {*} res The express result object.
 * @param {*} next Next match route handler.
 */
function remove(req, res) {
    const id = req.params.id;
    Table.findByIdAndRemove(id)
        .then(() =>
            res.json({
                status: 204
            })
        )
        .catch(e => next(e));
}

module.exports = {
    list,
    create,
    update,
    remove
};
