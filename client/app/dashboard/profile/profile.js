'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });