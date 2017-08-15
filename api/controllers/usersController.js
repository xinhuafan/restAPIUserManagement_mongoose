'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('Users');
exports.listAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
};

exports.newUser = function(req, res) {
    var newuser = new User(req.body);
    newuser.save(function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

exports.getUser = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

exports.editUser = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            return res.send(err);
        }

        user.fName = req.body.fName;
        user.lName = req.body.lName;
        user.sex = req.body.sex;
        user.age = req.body.age;
        user.title = req.body.title;
        user.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    });
};

exports.deleteUser = function(req, res) {
    console.log(req.params.userId);
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            return res.send(err);
        }

        user.remove(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    });
};
