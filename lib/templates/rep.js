/* jshint node:true */
/* global require */
/* global exports */
'use strict';

exports.lib = {};

exports.bind = function bind (_callback, _options) {
  return this.lib._bind(_callback, _options);
};

exports.lib._bind = function _bind () {
  throw new Error('You have to implement a protocol specific socket.lib._bind method');
};

exports.close = function close () {
  this.lib._close();
};

exports.lib._close = function _close () {
  throw new Error('You have to implement a protocol specific socket.lib._close method');
};

exports.lib._respond = function _respond () {
  throw new Error('You have to implement a protocol specific socket.lib._respond method');
};

exports.lib._getPeer = function _getPeer () {
  throw new Error('You have to implement a protocol specific socket.lib._respond method');
};

exports.lib._getBufferSize = function _getBufferSize () {
  throw new Error('You have to implement a protocol specific socket.lib._respond method');
};
