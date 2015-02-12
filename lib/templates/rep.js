/* jshint node:true */
'use strict';

exports.lib = {};

exports.bind = function bind (_callback, _options) {
  return this.lib._bind(_callback, _options);
};

exports.lib._bind = function _bind () {
  throw new Error('You have to implement a protocol specific socket._bind method');
};

exports.respond = function respond (packet, meta, response, code) {
  this.lib._respond(packet, meta, response, code);
};

exports.lib._respond = function _respond () {
  throw new Error('You have to implement a protocol specific socket._respond method');
};

exports.close = function close () {
  this.lib._close();
};

exports.lib._close = function _close () {
  throw new Error('You have to implement a protocol specific socket._close method');
};
