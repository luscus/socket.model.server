/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var Assert       = require('assert-plus');

exports.validate = function validate (options) {

  // has a "port" option
  Assert.ok(options.port, 'options.port');
  try {
    // port can be a range: [start, end] => [8080, 8090]
    Assert.optionalArrayOfNumber(options.port, 'options.port');
  }
  catch (ex) {
    // port can be a number: 8080
    Assert.optionalNumber(options.port, 'options.port');
  }
};
