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


exports.getDistanceFromLatLonInM = function (loc1, loc2) {
    var lat1 = loc1[0];
    var lon1 = loc1[1];
    var lat2 = loc2[0];
    var lon1 = loc2[1];

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d * 1000;
  }