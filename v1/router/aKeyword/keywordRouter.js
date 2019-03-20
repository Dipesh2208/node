var express = require('express');
var router = express.Router();
var keywordController = require('../../controller/aKeyword/keywordController');
// var authoController = require('../../../controller/admin/aAuthorization/aAuthorizationController');

/*
 * POST
 */
router.post('/:id',keywordController.create);

/*
 * update
 */
router.put('/',keywordController.update);

/*
 * DELETE
 */
router.put('/:id',keywordController.remove);


/*
 * GET
 */
router.get('/:id',keywordController.getData);


/*
 * Dashboard
 */
router.get('/',keywordController.dashboard);


module.exports = router;