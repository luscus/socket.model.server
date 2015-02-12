/* jshint node:true */
'use strict';

exports.EADDRINUSE = function EADDRINUSE (socket) {
  //console.warn('EADDRINUSE: ', socket.options.host+':'+socket.options.port);
  socket.emit('portUsed', socket);
};

exports.handle = function handleError (error) {
  var socket = this;

  if (exports[error.code]) {
    exports[error.code](socket);
  }
  else {
    throw error;
  }
};
