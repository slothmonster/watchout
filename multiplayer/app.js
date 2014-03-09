
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io').listen(server)
  , _ = require('underscore');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var generateEnemyCoords = _.once(function(){
  setInterval(function(){
    var arr = _.range(20).map(function(i){
      return [((Math.random() * 660) + 20), ((Math.random() * 660) + 20)];
    });
    io.sockets.emit('enemies', arr);
  }, 1000)
});


io.sockets.on('connection', function (socket) {
  generateEnemyCoords();
  var uid = socket.handshake.address.address + ":" + socket.handshake.address.port;
  //connections[uid] = { socket: socket };

  socket.emit('connect', { hello: uid });


  socket.on('playerUpdate', function (data) {
    socket.broadcast.emit('playerUpdate', {
      uid : uid,
      coords : data
    });
  });

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
    delete connections[socket.handshake.address.address + ":" + socket.handshake.address.port];
  });
});