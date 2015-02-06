/* jshint node:true */
'use strict';

exports.wrapData = function wrapData (data, meta) {
  var wrap = {};
  var now  = Date.now();

  wrap.data                = data;

  wrap.meta                = {};
  wrap.meta.id             = meta.id;
  wrap.meta.start          = meta.start;
  wrap.meta.requestLatency = meta.requestLatency;
  wrap.meta.responseTime   = now - meta.responseStart;

  return wrap;
};
