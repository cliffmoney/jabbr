'use strict';

angular.module('jabbrApp')

  .controller('PreferencesCtrl', function ($scope, Auth, $http, $location) {
    $scope.user = {
      native: "English",
      learning: "English"
    };
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.tempLanguages = ["English","Chinese","Spanish","Arabic"];
    //save what languages user want to learn on submit
    $scope.submit = function(form) {
      $scope.status = 'saving...';
      $http.put('api/users/preferences', {
        native: $scope.user.native, 
        learning: $scope.user.learning
      })
      .success(function (data, status) {
        $scope.status = 'saved';
        $location.path('/dashboard');
      })
      .error( function(err) {
        console.log(err);
        //TO BE DELETED
        $location.path('/');
      });
    };
    var init = function() {
      var url = 'https://www.googleapis.com/language/translate/v2/languages?key='
      $http.get('/someUrl').
        success(function(data, status, headers, config) {
          console.log(data);
        }).
        error(function(data, status, headers, config) {
          console.log('Error getting list of supported languages')
        });
    }

    init();

  });
