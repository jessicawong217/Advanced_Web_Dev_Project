const express = require('express');
const waiterCtrl = require('./waiter.controller');

const router = express.Router();

router
  .route('/')
  /** GET /api/waiter - Get list of waiter */
  .get(waiterCtrl.list);

router
  .route('/seed')
  /** GET /api/waiter/seed - Add dummy data */
  .post(waiterCtrl.seed);

module.exports = router;
