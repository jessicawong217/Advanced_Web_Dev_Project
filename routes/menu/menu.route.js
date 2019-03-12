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

module.exports = router;
