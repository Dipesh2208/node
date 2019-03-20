var express = require('express');
var body = require('body-parser');
var app = express();
var cors = require('cors');
var http = require('http');
var path = require('path');

// parse application/json
app.use(body.json({limit: '500mb'}))

//parse application/x-www-form-urlencoded
app.use(body.urlencoded({ limit: '500mb',extended: true }));


//app.use(cors({origin : "http://localhost:4200"}));
app.use(cors({}));
app.use('/uploads', express.static(__dirname + '/uploads'));
var version1 = require('./v1/1');
app.use('/v1',version1);
http.createServer(app).listen(2002,function(){
    console.log("Express server listening on port " + 2002);
});