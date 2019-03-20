var sloginModel = require('./../../schema/admin/admin');
var jwt = require('jsonwebtoken');
var secret_key = require('../../../config/final');
var rCode = require('./../../common/code');
var rMessage = require('./../../common/message');

module.exports = {
    login: function (req, res) {
        var sEmailId = req.body.emailId;
        var sPassword = req.body.password;
        // console.log(JSON.stringify(req.body))
        var sDate = new Date();
        sloginModel.findOne({ EmailId: sEmailId }, function (err, dLogin) {
            if (err) {
                return res.json({
                    status: rMessage.FLAG_FAIL,
                    code: rCode.FAIL_CODE,
                    message: rMessage.FAIL
                });
            }
            if (dLogin) {
                var dbPassword = dLogin.Password;
                var dbId = dLogin._id;
                var dbEmailId = dLogin.EmailId;
                dLogin.comparePassword(sPassword, dbPassword, function (err, isMatch) {
                    if (err) {
                        return res.json({
                            status: rMessage.FLAG_FAIL,
                            code: rCode.FAIL_CODE,
                            message: rMessage.FAIL
                        });
                    }
                    if (!isMatch) {
                        return res.json({
                            status: rMessage.FLAG_FAIL,
                            code: rCode.FAIL_CODE,
                            message: rMessage.FAIL
                        });
                    } else {
                        var token = jwt.sign({

                            _id: dbId,
                            EmailId: dbEmailId
                        }, secret_key.secret_token,
                            { algorithm: 'HS512' , expiresIn : '1m'});

                        var uData = {
                            Logintoken: token,
                            Createdate: sDate
                        };
                        sloginModel.findByIdAndUpdate(dbId, uData, {upsert: true, new: true }, function (err, login) {
                            if (err) {
                                return res.json({
                                    status: rMessage.FLAG_FAIL,
                                    code: rCode.FAIL_CODE,
                                    message: rMessage.FAIL
                                });
                            }
                            if (login) {
                                return res.json({
                                    status: rMessage.FLAG_SUCCESS,
                                    code: rCode.SUCCESS_CODE,
                                    message: rMessage.SUCCESS,
                                    data: token

                                });
                            } else {
                                return res.json({
                                    status: rMessage.FLAG_FAIL,
                                    code: rCode.FAIL_CODE,
                                    message: rMessage.FAIL
                                });
                            }
                        })
                    }


                });
            } else {
                return res.json({
                    status: rMessage.FLAG_FAIL,
                    code: rCode.FAIL_CODE,
                    message: rMessage.FAIL
                });
            }
        })

    }
};