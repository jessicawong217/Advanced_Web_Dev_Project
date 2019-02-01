const express = require('express');
const menuCtrl = require('./menu.controller');

const router = express.Router();

router
  .route('/')
  /** GET /api/menu - Get list of menu */
  .get(menuCtrl.list);

router
  .route('/seed')
  /** GET /api/menu/seed - Add dummy data */
  .post(menuCtrl.seed);

module.exports = router;
