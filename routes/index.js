var express = require('express');
var router = express.Router();

var seedCtrl = require('./seed.controller');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Restaurant App' });
});

/* POST to do all the seeding */
router.post('/api/seed', seedCtrl.seed);

module.exports = router;
