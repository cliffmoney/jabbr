'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('overview', {
        url: '/overview',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/overview/overview.html',
        controller: 'OverviewCtrl'
      });
  });