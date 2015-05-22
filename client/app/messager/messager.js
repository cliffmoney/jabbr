'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('messager', {
        url: '/messager',
        templateUrl: 'app/messager/messager.html',
        controller: 'MessagerCtrl',
        authenticate: true
      });
  });