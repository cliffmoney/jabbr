'use strict';

// service for interacting with message data

angular.module('jabbrApp')
  .factory('Message', function ($resource) {
    return $resource('/api/messages/:id', {
      id: '@_id'
    },
    {
      fiveMostRecent: {
        method: 'GET',
        params: {
          controller: 'recent'
        }
      },
      update: {
        method: 'PUT'
      }
    });
  });