'use strict';
module.exports = function(app) {
    var userList = require('../controllers/usersController');
    app.route('/users')
        .get(userList.listAllUsers)
        .post(userList.newUser);
    app.route('/users/:userId')
        .get(userList.getUser)
        .put(userList.editUser)
        .delete(userList.deleteUser);
};