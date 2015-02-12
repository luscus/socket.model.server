/* jshint node:true */
'use strict';

var tools        = require('socket.lib.tools');
var pless        = require('prototype-less');
var portHandler  = require('./events/portUsed');
var onListening  = require('./events/onListening');
var ErrorHandler = require('./tools/ErrorHandler');
var request      = require('./tools/request');
var validation   = require('./validation');

exports.validate    = validation.validate;
exports.handleError = ErrorHandler.handle;
exports.request     = request;

exports.apply       = function applyServerTemplate (_socket) {

  _socket.config.path = tools.uri.getPathString(
    _socket.config.port,
    _socket.config.secret
  );

  var patternTemplate = require('./templates/' + _socket.config.pattern);
  pless.mixin.apply(_socket, patternTemplate);

  _socket.on('portUsed', portHandler.onPortUsed.bind(_socket));
  _socket.on('listening', onListening.bind(_socket));
};
