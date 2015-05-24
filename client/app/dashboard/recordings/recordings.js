'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('recordings', {
        url: '/recordings',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/recordings/recordings.html',
        controller: 'RecordingsCtrl'
      });
  });