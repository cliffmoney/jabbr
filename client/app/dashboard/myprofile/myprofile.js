'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myprofile', {
        url: '/dashboard/myprofile',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/myprofile/myprofile.html',
        controller: 'MyprofileCtrl'
      });
  });