var socketio = require('socket.io');

module.exports.listen = function(app){
  io = socketio.listen(app)

  io.on('connection', function(socket){


  });
  return io;
}