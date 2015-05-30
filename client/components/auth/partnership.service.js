'use strict';

// service for interacting with partnership data

angular.module('jabbrApp')
  .factory('Partnership', function ($resource) {
    return $resource('/api/partnerships/:id/:controller', {
      id: '@_id'
    },
    {
      confirm: {
        method: 'PUT',
        params: {
          controller: 'confirm'
        }
      }
    });
  });