

var Excel = require("xlsx");
var aApplicationModel = require('../../schema/admin/application');
var aConstant = require('./../../../config/final');

module.exports = {
    updateActive: function (req, res ) {
        var pId = req.body.id;
        var date = new Date();
        var rActive =  req.body.active;
        if (!pId) {
            return res.json({
                status: false,
                code: 3001,
                message: "Name must be fill."
            });
        }
        aApplicationModel.findByIdAndUpdate(pId, {$set: {ISACTIVE :rActive ,U_DATE : date}}, {new: true, upsert: true},function (err, application) {
            if (err) {
                return res.json({
                    status: false,
                    code: 3002,
                    message: 'Error update'
                });
            }
            if (!application) {
                return res.json({
                    status: false,
                    code: 3003,
                    message: 'No such'
                });
            } else {
                return res.json({
                    status: true,
                    code: 3000,
                    message: 'Api successfully update',
                    data: application
                });
            }
        });
    },
    list: function (req, res) {
        aApplicationModel.find().sort({'I_DATE' : -1}).exec(function (err, data){
            if(err){
                return res.json({
                    status: false,
                    code: 3002,
                    message: 'Error on getting application Information.'
                });
            }
            if(data) {
                return res.json({
                    status: true,
                    code: 3000,
                    message: 'Data List',
                    data: data
                })
            } else {
                return res.json({
                    status: false,
                    code: 3002,
                    message: 'Error on getting application Information.'
                });
            }
        })
    },
    remove: function (req, res) {
        var pId = req.params.id;
        aApplicationModel.findByIdAndRemove(pId, function (err, application) {
            if (err) {
                return res.json({
                    status: false,
                    code: 3001,
                    message: 'Error on getting application Information.'
                });
            }
            if (application) {
               
                return res.json({
                    status: true,
                    code: 3000,
                    message: 'Data successfully delete',
                    data: application
                });
            } else {
                return res.json({
                    status: false,
                    code: 3002,
                    message: 'Error on getting application Information.'
                });
            }

        });
    },
    downloadFile: function (req,res){
        var fileName = req.body.filename;
        
        res.download(aConstant.server_url + fileName);
    }

};


