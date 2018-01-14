module.exports = function(server) {
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        console.log('Someone connected to socket.');
        socket.user_id = 0;

        socket.on('hello', function(){
            socket.emit('Hello', "hello from backend");
            console.log('Hello received from client.');
        });

        socket.on('start getting posts', function(){
            console.log('To be implemented.');
        });

        socket.on('gather information', function(data){
            io.emit('update', data);
            console.log('Changes detected, push to clients.');
            console.log('Content:' + data);
        });

        socket.on('disconnect', function(){
            console.log('Someone disconnected from socket.');
        });
    });
};