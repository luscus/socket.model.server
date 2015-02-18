/* jshint node:true */
'use strict';

var tools           = require('socket.lib.tools');

exports.generateId = function generateId (socketOptions) {
  socketOptions = socketOptions || this.options;

  var id =
        socketOptions.appName +
        ':' +
        socketOptions.protocol +
        ':' +
        socketOptions.port;

  return id;
};

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

  _socket.id = exports.generateId(_socket.options);

  _socket.options.rootHash = tools.uri.getRootHash(
    _socket.options.port,
    _socket.options.secret
  );

  exports.generateUri(_socket);

};
