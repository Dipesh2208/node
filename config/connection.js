/**
 * Created by Jadav Dipesh on 8/25/2017.
 */
// module.exports = {
//     //dburl	: 'mongodb://multiApps:MohitDream4U@127.0.0.1:27017/multiApp?authSource=multiApp',
// 	dburl : 'mongodb://127.0.0.1:27017/multiple_2',
//     secret_token : 'Hello_Secure_Api_Key_Value'
// }
//
//Create Server on database
// db.createUser({user: "multiApps",
//     pwd: "MohitDream4U",
//     roles: [ { role: "readWrite", db: "multiApp" }
//     ]})


// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
var dbURI = 'mongodb://localhost/database_1';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS // For example
module.exports = mongoose;
