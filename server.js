var express = require('express');
var app = express();
var port = process.env.PORT || 8888;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./api/models/usersModel');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:abc123@ds145148.mlab.com:45148/demo');
var routes = require('./api/routes/usersRoutes');
routes(app);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);
console.log('user management restful api server started on: ' + port);