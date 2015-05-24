'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('messager', {
        url: '/messager',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/messager/messager.html',
        controller: 'MessagerCtrl',
        authenticate: true
      });
  });