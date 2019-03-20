var express = require('express');
var router = express.Router();
var sLoginController = require('./../../controller/sLogin/sLoginController');

router.post('/',sLoginController.login);

module.exports = router;