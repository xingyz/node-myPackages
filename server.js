//server.js
//modules=========================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

//mongodb Schema and connection====================
var Student = require('./app/models/student')
mongoose.connect('mongodb://localhost:27017/test');

//when POST, parse body data=======================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//set the location for public folder
app.use('/static',express.static('public'));
//configure template engine
app.set('view engine','jade');
app.set('views','./views');

var port = process.env.PORT || 8080;
app.listen(port);
//configuer routes=================================
var api_router = express.Router();
var web_router = express.Router();
require('./app/routes/api')(api_router);
require('./app/routes/index')(web_router);
app.use('/',web_router);
app.use('/api',api_router);


console.log('listening on port '+ port);
