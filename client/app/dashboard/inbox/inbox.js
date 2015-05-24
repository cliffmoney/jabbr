'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inbox', {
        url: '/inbox',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/inbox/inbox.html',
        controller: 'InboxCtrl'
      });
  });