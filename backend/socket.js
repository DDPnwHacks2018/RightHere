var helper = require('./utils');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(server) {
    var io = require('socket.io')(server);
    var idToSocketObject = {};

    io.on('connection', function(socket){
        console.log('Someone connected to socket.');
        socket.user_id = 0;

        socket.on('hello', function(){
            socket.emit('hello', "hello from backend");
            console.log('Hello received from client.');
        });

        socket.on('start_getting_updates', function(data){
            // Take down socket object to socket io
            idToSocketObject[socket.id] = socket;

            // Save use data to db
            helper.createUserInfo(socket.id, data.loc);
        });

        socket.on('update_user_loc', function(data){
            // Update user data to db
            helper.updateUserLoc(socket.id, data.loc);
        });

        socket.on('do_update_post', function(data){
            console.log('Post changes detected, push to clients.');
            console.log('Content:' + data);

            data = JSON.parse(data);

            User.find({loc: {$near: data.loc, $maxDistance: 5}}, 'loc socket_id', function (err, users){
                if (err) throw err;
                console.log(users);
                users.forEach(function(user){
                    if (idToSocketObject.hasOwnProperty(user.socket_id)) {
                        idToSocketObject[user.socket_id].emit("new_post", data);
                    }
                });
            });
        });

        socket.on('do_update_reply', function(data) {
            console.log('Reply changes detected, push to clients.');
            console.log('Content:' + data);

            data = JSON.parse(data);
            var testLoc = [10,15];

            User.find({loc: {$near: testLoc, $maxDistance: 5}}, 'loc socket_id', function (err, users){
                if (err) throw err;
                console.log(users);
                users.forEach(function(user){
                    if (idToSocketObject.hasOwnProperty(user.socket_id)) {
                        idToSocketObject[user.socket_id].emit("new_reply", data.reply);
                    }
                });
            });
        });

        socket.on('disconnect', function(){
            // Delete socket id from hash
            delete idToSocketObject[socket.id];

            // Delete user info from db
            helper.removeUserInfo(socket.id);

            console.log('Someone disconnected from socket.');
        });
    });
};