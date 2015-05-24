'use strict';

angular.module('jabbrApp')
  .factory('Io', function () {
    if (typeof io === 'undefined') {
      throw new Error('Socket.io required');
    }
    return io;
  });
