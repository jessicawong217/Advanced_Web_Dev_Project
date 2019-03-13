const express = require('express');
const userCtrl = require('./user.controller');

const router = express.Router();

router
    .route('/')
    /** GET /api/users - Get a list of users */
    .get(userCtrl.list)
    /** POST /api/users - Create a new user */
    .post(userCtrl.create);

router
    .route('/login')
    /** POST /api/users/login - Log a user in */
    .post(userCtrl.login);

router
    .route('/:id')
    /** PUT /api/users/:id - Mark all order item as completed */
    .put(userCtrl.update);

module.exports = router;
