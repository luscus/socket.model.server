/* jshint node:true */
'use strict';

var pless        = require('prototype-less');
var portHandler  = require('./events/portUsed');
var onListening  = require('./events/onListening');
var ErrorHandler = require('./tools/ErrorHandler');
var request      = require('./tools/request');
var validation   = require('./validation');
var options      = require('./tools/options');

exports.validate    = validation.validate;
exports.handleError = ErrorHandler.handle;
exports.request     = request;

exports.apply       = function applyServerTemplate (_socket) {

  options.update(_socket);

  // Applying the pattern specific beaviour template
  var patternTemplate = require('./templates/' + _socket.options.pattern);
  pless.mixin(_socket, patternTemplate);

  _socket.on('portUsed', portHandler.onPortUsed.bind(_socket));
  _socket.on('listening', onListening.bind(_socket));
};
