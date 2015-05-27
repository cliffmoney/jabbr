'use strict';

// service for interacting with message data

angular.module('jabbrApp')
  .factory('Message', function ($resource) {
    return $resource('/api/users/:id/messages', {
      id: '@_id'
    },
    {
      
    });
  });