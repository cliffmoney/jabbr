'use strict';

angular.module('jabbrApp')
  .controller('InboxCtrl', function ($scope, $http) {
    $scope.messages = [];

    $http.get('api/users/invitations')
      .success(function(data, status){
        $scope.messages = data;
      })
      .error(function(error) {
        console.log(error);
      });

  });
