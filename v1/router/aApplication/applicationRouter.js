
var express = require('express');
var router = express.Router();
var aApplicationController = require('../../controller/aApplication/applicationController');
var aApplicationModel = require('./../../schema/admin/application')
// var aAuthController = require('../../../controller/admin/aAuthorization/aAuthorizationController');
var rPath = 'uploads/';
var fs = require('fs');
var Excel = require('xlsx')
var multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        // console.log(file.originalname)
        cb(null, new Date().toDateString())
    }
});
var upload = multer({ storage: storage });

router.post('/', upload.single('keyfile'), function (req, res) {
    var date = new Date();
    var rAppname = req.body.name;
    var rSkuname = req.body.skuname;
    const file = req.file.filename;
    var rFullpath = rPath + file;
    const workbook = Excel.readFile(rFullpath);
    const sheet_name_list = workbook.SheetNames;
    var rImageurl = req.body.imageurl;
    var rWebPath = req.body.path;
    var jsonData = Excel.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    console.log(jsonData)
    var date = new Date()
    var rUserdata = [];
    for (var i = 0; i < jsonData.length; i++) {
        var rNo = jsonData[i].No == undefined || null ? "" : jsonData[i].No;
        var rKeyValue = jsonData[i].KeyValue == undefined || null ? "" : jsonData[i].KeyValue;
        var rValue = jsonData[i].Value == undefined || null ? "" : jsonData[i].Value;
        if (rNo != "" && rKeyValue != "") {
            var pushData = {
                NO: rNo,
                KEY: rKeyValue,
                VALUE: rValue
            }
            rUserdata.push(pushData)
        }
    }

    if (!rSkuname || !file) {
        return res.json({
            status: false,
            code: 3001,
            message: "Must be fill."
        });
    } else {
        if (!(/^[a-zA-Z0-9_]*$/.test(rSkuname.trim()))) {
            return res.json({
                status: false,
                code: 3002,
                message: rSkuname + " is not a valid sku name!"
            });
        }
    }
    if (!rAppname) {
        return res.json({
            status: false,
            code: 3003,
            message: "Name must be fill."
        });
    }
    rFilename = req.file.filename;
    rFullpath = 'localhost:2002/uploads' + '/' + rFilename;
    var app = new aApplicationModel({
        NAME: rAppname,
        SKUNAME: rSkuname,
        F_NAME: rFilename,
        F_PATH: rFullpath,
        IMAGE_URL : rImageurl.trim(),
        PATH : rWebPath,
        KEYWORD: rUserdata,
        I_DATE: date,
        U_DATE: date
    });
    app.save(function (err, app) {
        if (err) {
            if (err.message) {
                return res.json({
                    status: false,
                    code: 3004,
                    message: "Duplicate Sku Name.Please Enter Different Name."
                });
            } else {
                return res.json({
                    status: false,
                    code: 3005,
                    message: 'Error saving application'
                });
            }
        }
        if (app) {
            return res.json({
                status: true,
                message: 'Application successfully insert',
                code: 3000,
                data: app
            });
        } else {
            return res.json({
                status: false,
                code: 3006,
                message: 'Error saving application'
            });
        }
    });

});

// router.put('/:id', aApplicationController.update);

router.put('/:id', upload.single('keyfile'), function (req, res,next) {
    var date = new Date();
    var pId = req.params.id;
    var rAppname =  req.body.name;
    var rImageurl = req.body.imageurl == undefined || null || "" ? "" : req.body.imageurl;
    var rPath = req.body.path == undefined || null || "" ? "" : req.body.path;


    if(req.file != undefined) {
        const file = req.file.filename;
        var rFullpath = rPath + file;
        const workbook = Excel.readFile(rFullpath);
        const sheet_name_list = workbook.SheetNames;
        var jsonData = Excel.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        var rUserdata = [];
        for (var i = 0; i < jsonData.length; i++) {
            var rNo = jsonData[i].No == undefined || null ? "" : jsonData[i].No;
            var rKeyValue = jsonData[i].KeyValue == undefined || null ? "" : jsonData[i].KeyValue;
            var rValue = jsonData[i].Value == undefined || null ? "" : jsonData[i].Value;
            if (rNo != "" && rKeyValue != "") {
                var pushData = {
                    NO: rNo,
                    KEY: rKeyValue,
                    VALUE: rValue
                }
                rUserdata.push(pushData)
            }
        }
        rFilename = req.file.filename;
        rFullpath = 'localhost:2002/uploads' + '/' + rFilename;


        aApplicationModel.findByIdAndUpdate(pId, {$set: {NAME: rAppname.trim() , IMAGE_URL : rImageurl.trim(),  F_NAME: rFilename,
            F_PATH: rFullpath, PATH : rPath.trim() , U_DATE : date}},function (err, application) {
            if (err) {
                return res.json({
                    status: false,
                    code: 3002,
                    message: 'Error update'
                });
            }
            if (!application) {
                var fileRemove = application.F_PATH;
                fs.unlink(fileRemove, function(err) {
                     if (err)  next(err);
                    console.log('path/file.txt was deleted');
                  });
                return res.json({
                    status: false,
                    code: 3003,
                    message: 'No such '
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

    } else {
        // Without File Upload
        aApplicationModel.findByIdAndUpdate(pId, {$set: {NAME: rAppname.trim() , IMAGE_URL : rImageurl.trim(), PATH : rPath.trim() , U_DATE : date}}, {new: true, upsert: true},function (err, application) {
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
                        message: 'No such '
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


    }



});




router.put('/', aApplicationController.updateActive);


router.get('/', aApplicationController.list);

router.delete('/:id', aApplicationController.remove);

router.get(':/id', aApplicationController.downloadFile);


module.exports = router;