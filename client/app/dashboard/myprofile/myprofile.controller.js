'use strict';

angular.module('jabbrApp')
  .controller('MyprofileCtrl', function ($scope, User) {
    
    $scope.myProfile = User.getProfile({id: $scope.currentUser._id});
  });
