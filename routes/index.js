var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));
//router.use('/', require('./test'));

module.exports = router;
