/* jshint node:true */
'use strict';

var tools          = require('socket.lib.tools');

exports.onPortUsed = function onPortUsed (socket) {
  var port = socket.config.port;

  if (! socket.config.maxPortNumber) {
    throw {
      name: 'ServerBindException',
      message: 'Port "' + socket.config.port + '" is already used:' +
            '\n   choose a new one or specify a port range such as "port: [20000, 20004]" allowing' +
      '\n   the service to be run multiple times to take advantage of multiple cores (clustering)\n\n'
    };
  }
  else {
    var newPort = port + 1;

    if (newPort <= socket.config.maxPortNumber) {
      socket.config.port = newPort;
      socket.config.path = tools.uri.getPathString(
        socket.config.port,
        socket.config.secret
      );


      delete socket.listener;

      socket.bind(socket.requestHandler);
    }
    else {
      throw {
        name: 'ServerBindException',
        message: 'Port "' + newPort + '" exceeding port maximum number "' + socket.config.maxPortNumber + '":' +
        ' increase the number of ports or decrease number of processes \n\n'
      };
    }
  }
};
