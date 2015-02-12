/* jshint node:true */
'use strict';

var base = require('./rep');

base.broadcast = function broadcast (packet) {
  this.lib._broadcast(packet);
};

base.lib._broadcast = function _broadcast () {
  throw new Error('You have to implement a protocol specific socket._broadcast method');
};

module.exports = base;
