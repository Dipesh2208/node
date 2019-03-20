

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var adminSchema = new Schema({
    Password: {type: String, required: true, trim: true},
    EmailId: { type: String, required: true, trim: true},
    Createdate : { type: Date},
    Logintoken : { type: String},

},{strict : false});

//encrypt password
adminSchema.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.Password, salt, function (err, hash) {
            if (err) return next(err);
            user.Password = hash;
            next();
        });
    });
});

//Compare Password
adminSchema.methods.comparePassword = function (candidatePassword, hash, cb) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) cb(err);
        cb(null, isMatch);
    });
};

//Compare Password
// adminSchema.methods.comparePassword = async (candidatePassword, hash) => {
//    let isMatch = await bcrypt.compare(candidatePassword, hash);
//    return isMatch;
// };

var Admin = mongoose.model('ADMIN', adminSchema);
module.exports = Admin;