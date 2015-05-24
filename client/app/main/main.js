'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        parent: 'base',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });