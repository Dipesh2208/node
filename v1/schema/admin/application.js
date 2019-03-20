


var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var applicationSchema = new Schema({
    NAME : {type: String,trim: true},
    SKUNAME : {type: String, unique : true, trim : true},
    ISACTIVE: {type: Boolean, default: true},
    KEYWORD : [{
        NO:{type: Number},
        KEY: {type: String},
        VALUE: {type: String}
    }],
    I_DATE : { type : Date},
    U_DATE : { type : Date}

},{strict : false});
applicationSchema.index({ SKUNAME : 1 })
var Application = mongoose.model('APPLICATION', applicationSchema);
module.exports = Application;


// var applicationSchema = new Schema({
//     NAME : {type: String,trim: true},
//     SKUNAME : {type: String, unique : true, trim : true},
//     ISACTIVE: {type: Boolean, default: true},
//     KEYWORD : [{
//         KEY: {type: String},
//         VALUE: {type: String}
//     }, { _id : false }],
//     I_DATE : { type : Date},
//     U_DATE : { type : Date}

// },{strict : false});