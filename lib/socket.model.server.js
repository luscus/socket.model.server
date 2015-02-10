/* jshint node:true */
'use strict';

var portHandler  = require('./events/portUsed');
var onListening  = require('./events/onListening');
var ErrorHandler = require('./tools/ErrorHandler');
var request      = require('./tools/request');
var validation   = require('./validation');

exports.validate    = validation.validate;
exports.handleError = ErrorHandler.handle;
exports.request     = request;
exports.apply       = function applyServerTemplate (_socket) {
  _socket.on('portUsed', portHandler.onPortUsed.bind(_socket));
  _socket.on('listening', onListening.bind(_socket));
};