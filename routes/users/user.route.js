const express = require('express');
const userCtrl = require('./user.controller');

const router = express.Router();

router
    .route('/')
    .get(userCtrl.list)
    .post(userCtrl.create);

router
    .route('/login')
    .post(userCtrl.login);

router
    .route('/:id')
    .put(userCtrl.update);

module.exports = router;
