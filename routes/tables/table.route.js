const express = require('express');
const tableCtrl = require('./table.controller');

const router = express.Router();

router
    .route('/')
    /** GET /api/tables - Get a list of tables */
    .get(tableCtrl.list)
    /** POST /api/tables - Create a new table */
    .post(tableCtrl.create);

router
    .route('/:id')
    /** PUT /api/tables/:id - Update a tables details */
    .put(tableCtrl.update)
    /** DELETE /api/tables/:id - Delete a table by its id */
    .delete(tableCtrl.remove);

module.exports = router;
