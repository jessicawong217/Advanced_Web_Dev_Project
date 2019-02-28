const express = require('express');
const counterCtrl = require('./counter.controller');

const router = express.Router();

router
    .route('/')
    .get(counterCtrl.list);

router
    .route('/:id')
    .get(counterCtrl.item);

router
    .route('/')
    .post(counterCtrl.saveBill);

router
    .route('/period')
    .post(counterCtrl.billsForPeriodOfTime);

router
    .route('/seed')
    .post(counterCtrl.seed);

module.exports = router;
