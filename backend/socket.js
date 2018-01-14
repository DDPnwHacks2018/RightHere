var helper = require('utils');

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

        socket.on('start getting updates', function(data){
            // Take down socket object to socket io
            idToSocketObject[socket.id] = socket;

            // Save use data to db
            helper.createUserInfo(socket.id, data.loc);

            console.log('To be implemented.');
        });

        socket.on('do_update_post', function(data){
            console.log('Post changes detected, push to clients.');
            console.log('Content:' + data);

            var socketIdList = helper.getRelevantSocketId(data.loc);
            for (var key in socketIdList) {
                if (idToSocketObject.hasOwnProperty(key)) {
                    idToSocketObject[key].emit("new_post", data);
                }
            }
        });

        socket.on('do_update_reply', function(data) {
            console.log('Reply changes detected, push to clients.');
            console.log('Content:' + data);

            var socketIdList = helper.getRelevantSocketId(data.loc);
            for (var key in socketIdList) {
                if (idToSocketObject.hasOwnProperty(key)) {
                    idToSocketObject[key].emit("new_reply", data.reply);
                }
            }
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