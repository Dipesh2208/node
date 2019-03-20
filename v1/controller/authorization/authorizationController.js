var aSuperAdminModel = require('./../../controller/authorization');
var jwt = require('jsonwebtoken')

module.exports = {

    authentication: function (req, res, next) {
        var headerData = req.headers['x-authorization'];
        if (headerData) {
            var decoded = jwt.decode(headerData);
            if(decoded == null || decoded == undefined){
                res.json({
                    status: false,
                    code: 1001,
                    message: 'You are not authorization'
                });
            } else {
                var cId = decoded._id;
                var cRole = decoded.role;
                if (cRole == "SUPERADMIN" ||cRole == "ADMIN" || cRole == "VISITOR" ) {
                    aSuperAdminModel.find({
                        _id: cId,
                        LOGIN_TOKEN: headerData,
                        ISACTIVE :true
                    }, function (err, user) {
                        if (err) {
                            res.json({
                                status: false,
                                code: 1006,
                                message: 'Error getting token.'
                            });
                        }
                        if (!user) {
                            res.json({
                                status: false,
                                code: 1005,
                                message: 'You are not authorization.'
                            });
                        } else {
                            if(user.length > 0){
                                next()
                            } else {
                                res.json({
                                    status: false,
                                    code: 1004,
                                    message: 'You have not permission.'
                                });
                            }

                        }

                    });
                } else {
                    res.json({
                        status: false,
                        code: 1003,
                        message: 'You have not permission.'
                    });
                }
            }
        } else {
            res.json({
                status: false,
                code: 1002,
                message: 'Error getting authorization.'
            });
        }
    }
};
