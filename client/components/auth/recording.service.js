'use strict';

angular.module('jabbrApp')
  .factory('Recording', function ($resource) {
    return $resource('/api/recordings/:id/:controller', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      getUserRecordings: {
        method: 'GET',
        params: {
          id:'userRecordings'
        }
      },
      getOneRecording: {
        method: 'GET',
        // isArray: true,
        params: {
          id:'oneRecording'
        }
      },
      // show: {
      //   method: 'GET',
      //   isArray: true,
      //   params: {

      //   }
      // }
    });
  });
