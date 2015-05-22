'use strict';

angular.module('jabbrApp')
  .factory('Session', function Session($location, $rootScope, $http, Auth, User) {
    var currentlyMessaging;
    return {
      setCurrentlyMessaging: function(userId) {
        currentlyMessaging = userId;
      },
      getCurrentlyMessaging: function() {
        return currentlyMessaging;
      }
    };
  });
