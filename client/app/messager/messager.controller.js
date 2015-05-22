'use strict';

angular.module('jabbrApp')
  .controller('MessagerCtrl', function ($scope, Auth, Session) {
    $scope.currentlyMessaging = Session.getCurrentlyMessaging();
  });
