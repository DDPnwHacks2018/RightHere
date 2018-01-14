var mongoose = require('mongoose');
var User = mongoose.model('User');

// Given a loc and a socket_id, save to db
// No return
exports.createUserInfo = function (socket_id, loc) {
    var user = {
        posts: [],
        loc: loc,
        socket_id: socket_id
    };

    User.create(user, function(err, user) {
        if (err) throw err;
    });
};

// Given a loc and a socket_id, update the loc to the db
// No return
exports.updateUserLoc = function (socket_id, loc) {
    User.update({socket_id: socket_id}, {$set: {loc: loc}}, function(err){
        if (err) throw err;
    });
};

// Remove user from db by socket_id
// No return
exports.removeUserInfo = function (socket_id) {
    User.find({socket_id: socket_id}).remove().exec();
};