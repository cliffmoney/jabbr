'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        parent: 'base',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });