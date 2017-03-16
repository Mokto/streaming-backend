  var socket = require('socket.io-client')('http://localhost:8080');
  socket.on('connect', function(){
    console.log('connected');
    socket.emit('menu:movies', function(data) {
      console.log(data);
    });
  });
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
