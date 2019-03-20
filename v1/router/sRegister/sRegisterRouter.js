var express = require('express');
var router = express.Router();
var registerController = require('./../../controller/sRegister/sRegisterController');

router.post('/', registerController.create);

module.exports = router;