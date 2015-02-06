/* jshint node:true */
'use strict';

module.exports = function onConnected (socket) {
  console.log('listening on: ', socket.uri);
};
