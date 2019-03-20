var aKeywordModel = require('../../schema/admin/application')
var mongoose = require('mongoose');


module.exports = {

    create: function (req, res) {
        var rKeyseqid = req.body.keyseqid;
        var rId = req.params.id;
        var rKeyword = req.body.key;
        var rValue = req.body.value;

        if(!rKeyword){
            return res.json({
                status: false,
                code : 3002,
                message: 'Keyword Name must be fill.'
            });
        }

        var iKeyword = {
            NO: rKeyseqid,
            KEY: rKeyword,
            VALUE: rValue
        }

        aKeywordModel.findByIdAndUpdate(rId, { $push: {KEYWORD : iKeyword }},{new : true, upsert: true},function (err,iKeyWord) {
            if(err){
                return res.json({
                    status: false,
                    code : 3001,
                    message: 'Internal Error'
                });
            }

            if(iKeyWord){
                return res.json({
                    status: true,
                    code : 3000,
                    message: 'Insert Data',
                    data :iKeyWord
                });

            } else {
                return res.json({
                    status: false,
                    code : 3002,
                    message: 'Internal Error'
                });
            }


        })


    },

    update: function (req, res) {
        var mainId = req.body.mainId;
        var rId = req.body.keyid;
        var rValue = req.body.value;
        aKeywordModel.findOneAndUpdate({ "KEYWORD._id" : new mongoose.Types.ObjectId(rId)} , { $set: { 'KEYWORD.$.VALUE': rValue  } },  {new: true, upsert: true},function (err, keyword) {
                if (err) {
                    return res.json({
                        status: false,
                        code : 4001,
                        message: 'Error on update keyword',
                        err : err
                    });
                }
                if (!keyword) {
                    return res.json({
                        status: false,
                        code : 4002,
                        message: 'Error on update keyword.'
                    });
                } else {

                    return res.json({
                        status: true,
                        code : 4000,
                        message: 'Keyword successfully update',
                        data : keyword
                    });
                }
            });
    },


    remove: function (req, res) {
        var mainId = req.params.id;
        var rId = req.body.keyid;
        aKeywordModel.update({_id: mainId}, { $pull: { 'KEYWORD':  {_id: rId } }}, {new: true, upsert : true},function (err, keyword) {
            if (err) {
                console.log(err)
                return res.json({
                    status: false,
                    code : 6001,
                    message: 'Internal Error.',
                    err: err
                });
            }
            if(keyword){
                return res.json({
                    status: true,
                    code : 6000,
                    message: 'Delete Succesfully.',
                    data : keyword
                });

            } else {
                return res.json({
                    status: false,
                    code : 6002,
                    message: 'Internal Error.'
                });
            }
        })
    },

    getData: function (req,res) {
        
        var rSkuname = req.params.id;
        aKeywordModel.findById(new mongoose.Types.ObjectId(rSkuname), { _id : 0, "KEYWORD.KEY" : 1 , "KEYWORD.VALUE" : 1},function (err, keyword) {
            if (err) {
                console.log(err)
                return res.json({
                    status: false,
                    code : 6001,
                    message: 'Internal Error.',
                    err: err
                });
            }
            if(keyword){
                return res.send(keyword.KEYWORD);

            } else {
                return res.json({
                    status: false,
                    code : 6002,
                    message: 'Internal Error.'
                });
            }
        })
    },


    dashboard : function (req,res) {
        aKeywordModel.aggregate([
            {$group: { _id : "$ISACTIVE", dtae : {$last : "$U_DATE"} , count:{$sum: 1 }}
        }], function (err, gdata) {
            if(gdata) {
                aKeywordModel.aggregate([
                    {$group: { _id : {
                        year:{$year:"$I_DATE"},
                        month:{$month:"$I_DATE"},
                        day:{$dayOfMonth:"$I_DATE"}
                    },
                    count:{$sum: 1 }
                }}], function(err, keyword) {
                    if (err) {
                        console.log(err)
                        return res.json({
                            status: false,
                            code : 6001,
                            message: 'Internal Error.'
                        });
                    }
                    if(keyword){
                        return res.send({
                            status: true,
                            code : 6000,
                            message: 'Count Dashboard.',
                            data : keyword,
                            line : gdata
                        });
        
                    } else {
                        return res.json({
                            status: false,
                            code : 6002,
                            message: 'Internal Error.'
                        });
                    }
                })
            }
        })
        
    }



  
};