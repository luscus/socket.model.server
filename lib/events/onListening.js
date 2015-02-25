/* jshint node:true */
/* global require */
/* global module */
'use strict';

module.exports = function onConnected (socket) {
  console.log('listening on: ', socket.uri);
};
