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
    .get(menuCtrl.get);

router
  .route('/seed')
  /** GET /api/menu/seed - Add dummy data */
  .post(menuCtrl.seed);

//router
//  .route('/remove')
//  .delete(menuCtrl.delete);

module.exports = router;
