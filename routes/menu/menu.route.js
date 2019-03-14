const express = require('express');
const menuCtrl = require('./menu.controller');

const router = express.Router();

router
    .route('/')
    /** GET /api/menu - Get list of menu */
    .get(menuCtrl.list)
    .post(menuCtrl.create);

router
    .route('/:id')
    .put(menuCtrl.update)
    /** PUT /api/menu/:id - Update by id*/
    .get(menuCtrl.get)
    /** DELETE /api/menu/:id - Delete an item */
    .delete(menuCtrl.remove);

router
    .route('/seed')
    /** POST /api/menu/seed - Add data */
    .post(menuCtrl.seed);

module.exports = router;
