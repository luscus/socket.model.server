/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var Packet  = require('socket.packet.base');
var tools   = require('socket.lib.tools');


exports.handler = function handler (data, meta) {
  var connection = this;
  var socket     = connection.parent;
  var packet;

  // add meta information
  meta.responder = socket.uri;
  var remoteHost = tools.net.dnsLookup(meta.remoteIp);
  if (remoteHost) meta.remoteHostname = remoteHost;


  if (data.CONNTEST) {
    // set connection test response
    packet = Packet.instantiate({CONNTEST:socket.uri}, 'packet.format.raw');
  }
  else {
    packet = Packet.instantiate(data, socket.options.format);
    packet.requestReceived();

    if (packet.getData()) {

      try {
        packet.setData(socket.lib._requestHandler(packet.getData(), meta));
        packet.responseReady();
      }
      catch (ex) {
        packet.setData({error: ex.message, stack: ex.stack});
      }
    }
    else {
      packet.setData({reason: 'no data was provided'});
    }
  }

  socket.lib._respond(packet, connection);
};
