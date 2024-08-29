'use strict'
const env = require('../env')
var app = require('../app');
var debug = require('debug')('nodejs:server');
var process = require('../env')
var http = require('http');
const socket = require('socket.io')
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(env.PORT || '3000');
app.set('port', port);
console.log({puerto:port});
/**
 * Create HTTP server.
 */
var server = http.createServer(app);

let io =  socket(server);

io.on("connection", function(socket)
{
  socket.on("newMsj", async function(data)
  {
    io.emit('newAlert',data)
  });
  socket.on("CloseSession", async function(data)
  {
    io.emit('logout_'+data.id,data.email)
  });
  
})
//



/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
//functions
function normalizePort(val) 
{
  var port = parseInt(val, 10);
  if (isNaN(port)) 
  {
    return val;
  }

  if (port >= 0) 
  {
    return port;
  }
  return false;
}
function onError(error) 
{
  if (error.syscall !== 'listen')
  {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening()
{
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
module.exports = socket; 
