'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    fName: {
        type: String,
        Required: 'kindly enter the first name'
    },
    lName: {
        type: String,
        Required: 'kindly enter the last name'
    },
    sex: {
        type: String,
        Required: 'kindly enter the sex'
    },
    age: {
        type: Number,
        Required: 'kindly enter the age'
    },
    title: {
        type: String,
        Required: 'kindly enter the title'
    }
});

module.exports = mongoose.model('Users', userSchema);
