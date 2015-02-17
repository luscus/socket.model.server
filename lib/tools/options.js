/* jshint node:true */
'use strict';

var tools           = require('socket.lib.tools');

exports.generateUri = function generateUri (_socket) {

  _socket.options.baseUrl = tools.net.getBaseUrl(_socket.options);
  _socket.uri             =  _socket.options.baseUrl;
  _socket.path            = '/';

  if (_socket.options.useRootHash) {
    _socket.path         +=  _socket.options.rootHash + '/';
  }

  _socket.uri            += _socket.path;
};

exports.update     = function update (_socket) {

  _socket.id =
    _socket.options.appName + ':' +
    _socket.options.protocol + ':' +
    _socket.options.port;

  _socket.options.rootHash = tools.uri.getRootHash(
    _socket.options.port,
    _socket.options.secret
  );

  exports.generateUri(_socket);

};