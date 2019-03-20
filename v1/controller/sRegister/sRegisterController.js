
var dbConnectionString = require('./../../../config/connection');
var sRegisterModel = require('./../../../v1/schema/admin/admin');
var rCode = require('./../../common/code');
var rMessage = require('./../../common/message');

module.exports = {

    create: function (req, res) {
        var sDate = new Date();

        var sPassword = req.body.password == null || undefined ? "" : req.body.password.trim();
        var sEmailid = req.body.emailId == null || undefined ? "" : req.body.emailId.trim();

        var rNewregister = new sRegisterModel({

            Password: sPassword,
            EmailId: sEmailid,
            Createdate: sDate
        })


        if(sPassword == "" || sEmailid == "" ){
            return res.json({
                status: rMessage.FLAG_FAIL,
                code : rCode.FAIL_CODE,
                message : rMessage.FAIL
            })
        } else {
            sRegisterModel.findOne({EmailId : sEmailid}, function(err,lRegister){
                if(err){
                    return res.json({
                        status: rMessage.FLAG_FAIL,
                        code : rCode.FAIL_CODE,
                        message : rMessage.FAIL
                    })
                }
                if(!(lRegister)){
                    rNewregister.save(function(err,sRegister){
                        if(err){
                            return res.json({
                                status: rMessage.FLAG_FAIL,
                                code : rCode.FAIL_CODE,
                                message : rMessage.FAIL,
                                err : err
                            })
                        }
                        if(sRegister){
                            return res.json({
                                status: rMessage.FLAG_SUCCESS,
                                code : rCode.SUCCESS_CODE,
                                message : rMessage.SUCCESS,
                                data : sRegister
                            })
                        } else {
                            return res.json({
                                status: rMessage.FLAG_FAIL,
                                code : rCode.FAIL_CODE,
                                message : rMessage.FAIL
                            })
                        }
                    })

                } else {
                    return res.json({
                        status: rMessage.FLAG_FAIL,
                        code : rCode.FAIL_CODE,
                        message : rMessage.FAIL
                    })
                }
            })
        }



    }

};