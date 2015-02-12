/* jshint node:true */
'use strict';

var tools          = require('socket.lib.tools');
var options        = require('../tools/options');

exports.onPortUsed = function onPortUsed (socket) {
  var port = socket.options.port;

  if (! socket.options.maxPortNumber) {
    throw {
      name: 'ServerBindException',
      message: 'Port "' + socket.options.port + '" is already used:' +
            '\n   choose a new one or specify a port range such as "port: [20000, 20004]" allowing' +
      '\n   the service to be run multiple times to take advantage of multiple cores (clustering)\n\n'
    };
  }
  else {
    var newPort = port + 1;

    if (newPort <= socket.options.maxPortNumber) {
      socket.options.port = newPort;

      options.update(socket);

      delete socket.listener;

      socket.bind(socket.requestHandler);
    }
    else {
      throw {
        name: 'ServerBindException',
        message: 'Port "' + newPort + '" exceeding port maximum number "' + socket.options.maxPortNumber + '":' +
        ' increase the number of ports or decrease number of processes \n\n'
      };
    }
  }
};
