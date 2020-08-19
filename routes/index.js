var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));
router.use('/test', require('./test'));

module.exports = router;
