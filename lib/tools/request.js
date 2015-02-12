/* jshint node:true */
'use strict';

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
