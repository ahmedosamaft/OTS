#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app'
import Debug from 'debug'
const debug = Debug('ots:server');
import http  from 'http'
import { Server } from "socket.io";
/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);
const io = new Server(server, {
  // path: "/api",
  // path:"/api/socket",
  cors:{origin:"*"}
})
// io.path('/api/socket')
io.on('connection', (socket) => {
  console.log("connect to base")
  socket.emit("message","hi postman")
  socket.on ('message', (data)=>{
    console.log(data)
  })
})
const chatNSP = io.of("/chat")
chatNSP.on("connection", (socket) => {
  console.log("connect to chat")
  socket.on("join", ()=>{
    socket.join('room1')
  })
  socket.on('chat', (data)=>{
    socket.to('room1').emit ("chat", data)
  })
  
  // chatNSP.emit("hibro","hello")
  
  
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
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

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
