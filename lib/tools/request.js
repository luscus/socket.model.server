/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var Packet  = require('socket.packet.base');
var tools   = require('socket.lib.tools');

exports.getMetadata = function getMetadata (socket, request) {
  var remoteIp       = tools.net.getRemoteIp(request);
  request.remoteHost = tools.net.dnsLookup(remoteIp);

  var meta = {
    remoteIp:       remoteIp
  };

  if (request.remoteHost) meta.remoteHostname = request.remoteHost;
  meta.bufferSize     = socket.lib._getBufferSize(request);
  meta.responder      = socket.uri;
  meta.requester      = socket.lib._getPeer(socket, request);
  meta.params         = request.params;

  return meta;
};

exports.handler = function handler (data) {
  var connection = this;
  var socket     = connection.parent;
  var packet;

  if (data.CONNTEST) {
    // set connection test response
    packet = Packet.instantiate({CONNTEST:socket.uri}, 'packet.format.raw');
  }
  else {
    packet = Packet.instantiate(data, socket.options.format);
    packet.requestReceived();

    if (packet.getData()) {

      try {
        packet.setData(socket.lib._requestHandler(packet.getData()));
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
