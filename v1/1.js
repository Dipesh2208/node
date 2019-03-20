var express = require('express');
var router = express.Router();

/*------------------------------------------ ADMIN API START ------------------------------------------------*/

/*-------- Super Admin Register Module ---------*/
var sRegisterRoute = require('./../v1/router/sRegister/sRegisterRouter');
router.use('/admin/sregister',sRegisterRoute);

/*---- Super Admin and Login Module ----*/
var sLoginRoute = require('./../v1/router/sLogin/sLoginRouter');
router.use('/admin/slogin',sLoginRoute);

/*------------------------------------------ ADMIN API CLOSE ------------------------------------------------*/

/*------------------------------------------ APPLICATION API START -----------------------------------------------*/

/*-------- Super Admin Test Module ---------*/
var sApplicationRoute = require('./../v1/router/aApplication/applicationRouter');
router.use('/admin/apis',sApplicationRoute);

/*---- Super Admin and Login Module ----*/
var sKeywordRoute = require('./../v1/router/aKeyword/keywordRouter');
router.use('/admin/keyword',sKeywordRoute);

/*------------------------------------------ APPLICATION API CLOSE ------------------------------------------------*/



/*------------------------------------------ API START -----------------------------------------------*/

/*---- Super Admin and Login Module ----*/
var sUserRoute = require('./../v1/router/aKeyword/keywordRouter');
router.use('/user/name',sUserRoute);

/*------------------------------------------  API CLOSE ------------------------------------------------*/


module.exports = router;
