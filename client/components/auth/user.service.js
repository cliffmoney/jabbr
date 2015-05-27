'use strict';

angular.module('jabbrApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      getProfile: {
        method: 'GET',
        params: {
          controller:'profile'
        }
      },
      getUserRecordings: {
        method: 'GET',
        params: {
          id:'userRecordings'
        }
      }
    });
  });
