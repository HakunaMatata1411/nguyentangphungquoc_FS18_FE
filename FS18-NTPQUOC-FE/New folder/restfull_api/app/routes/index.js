var express = require('express');
var router = express.Router();


router.use('/items', require('./items')) //controller
router.use('/careers', require('./careers')) //controller
router.use('/users', require('./users')) //controller
router.use('/auth', require('./auth')) //controller


module.exports = router;
