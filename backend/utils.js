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

    User.create(user, function(err) {
        if (err) throw err;
    });
};

// Given a loc, return relevant socket_id
// [socket_id+]
exports.getRelevantSocketId = function(loc) {
    User.find({loc: {$near: loc, $maxDistance: 5}}, 'socket_id')
        .exec(function (err) {
            if (err) throw err;
            return users;
        })
};

// Remove user from db by socket_id
// No return
exports.removeUserInfo = function (socket_id) {
    User.find({socket_id: socket_id}).remove().exec();
};