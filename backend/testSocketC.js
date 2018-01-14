var socketC = require('socket.io-client')('http://localhost:3000');

socketC.on('connect', function(){
    console.log("Socket connected.");
});

socketC.on('disconnect', function(){
    console.log("Socket disconnected.");
});

socketC.emit("gather information", "123");