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
      $http.put('api/users/preferences', {
        native: $scope.user.native, 
        learning: $scope.user.learning
      })
      .success(function () {
        $location.path('/dashboard');
      })
      .error( function(err) {
        console.log(err);
        //TO BE DELETED
        $location.path('/');
      });
    };


  });
