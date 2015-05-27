'use strict';

// service for interacting with partnership data

angular.module('jabbrApp')
  .factory('Partnership', function ($resource) {
    return $resource('/api/users/:id/partnership', {
      id: '@_id'
    },
    {
      
    });
  });