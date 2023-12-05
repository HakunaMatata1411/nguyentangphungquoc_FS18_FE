var express = require('express');
var router = express.Router();

router.use('/items', require('./items'));
router.use('/users', require('./users'));
router.use('/dashboard', require('./dashboard'));
router.use('/home', require('./home'));

module.exports = router;
