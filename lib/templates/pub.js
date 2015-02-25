/* jshint node:true */
/* global require */
/* global module */
'use strict';

var base = require('./rep');

base.broadcast = function broadcast (packet) {
  this.lib._broadcast(packet, this);
};

base.lib._broadcast = function _broadcast () {
  throw new Error('You have to implement a protocol specific socket.lib._broadcast method');
};

module.exports = base;
