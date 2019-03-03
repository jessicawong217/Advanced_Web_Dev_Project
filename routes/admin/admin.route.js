const express = require('express');
const adminCtrl = require('./admin.controller');

const router = express.Router();

router
    .route('/')
    .get(adminCtrl.list);

router
    .route('/:id')
    .get(adminCtrl.item);

router
    .route('/')
    .post(adminCtrl.saveBill);

router
    .route('/period')
    .post(adminCtrl.billsForPeriodOfTime);

router
    .route('/seed')
    .post(adminCtrl.seed);

module.exports = router;
