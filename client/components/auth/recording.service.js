'use strict';

angular.module('jabbrApp')
  .factory('Recording', function ($resource) {
    return $resource('/api/recordings/:id/', {
      id: '@_id'
    },
    {});
  });
