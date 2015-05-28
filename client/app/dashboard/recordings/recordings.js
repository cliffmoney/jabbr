'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('recordings', {
        url: '/recordings',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/recordings/recordings.html',
        controller: 'RecordingsCtrl'
      })//;
      // attempt below at making a recording view work
    // $stateProvider
      .state('recording', {
        url: '/recordings/:recordingId',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/recordings/recording/recording.html',
        controller: 'RecordingsCtrl'
      });
  });