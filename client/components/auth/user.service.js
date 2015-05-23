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
      getMeetups: {
        method: 'GET',
        params: {
          controller:'meetups'
        }
      },
      getSuggestedPartners: {
        method: 'GET',
        params: {
          id:'suggestedPartners'
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
