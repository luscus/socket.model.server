/* jshint node:true */
'use strict';

var tools   = require('socket.lib.tools');

exports.getPeer = function getPeer (socket, request) {
  return socket.config.protocol +
    '://' +
    (request.remoteHost || request.connection._peername.address) +
    ':' +
    request.connection._peername.port;
};

exports.getBufferSize = function getRequestBufferSize (request) {
  return request.socket.bytesRead;
};

exports.getMetadata = function getMetadata (socket, request) {
  var remoteIp       = tools.net.getRemoteIp(request);
  request.remoteHost = tools.net.dnsLookup(remoteIp);

  var meta = {
    remoteIp:       remoteIp
  };

  if (request.remoteHost) meta.remoteHostname = request.remoteHost;
  meta.bufferSize     = exports.getBufferSize(request);
  meta.responder      = socket.uri;
  meta.requester      = exports.getPeer(socket, request);
  meta.params         = request.params;

  return meta;
};
