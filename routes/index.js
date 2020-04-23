var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));
router.use('/csv', require('./csv'));

module.exports = router;
