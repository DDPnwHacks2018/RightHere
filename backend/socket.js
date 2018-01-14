module.exports = function(server) {
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        console.log('Someone connected to socket.');
        socket.user_id = 0;

        socket.on('hello', function(){
            socket.emit('hello', "hello from backend");
            console.log('Hello received from client.');
        });

        socket.on('start getting updates', function(){
            console.log('To be implemented.');
        });

        socket.on('do_update_post', function(data){
            console.log('Post changes detected, push to clients.');
            console.log('Content:' + data);

            io.emit('new_post', data);
        });

        socket.on('do_update_reply', function(data) {
            console.log('Reply changes detected, push to clients.');
            console.log('Content:' + data);

            io.emit('new_reply', data);
        });

        socket.on('disconnect', function(){
            console.log('Someone disconnected from socket.');
        });
    });
};