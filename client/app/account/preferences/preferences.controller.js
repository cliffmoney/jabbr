'use strict';

angular.module('jabbrApp')
  .controller('PreferencesCtrl', function ($scope, Auth, $http, $location) {
    $scope.languages = [];
    $http.get('/api/translate')
    .success(function (data, status) {
      var languages = data.data.languages;
      languages.forEach( function(lang) {
        var option = {
          name: lang.name,
          code: lang.language
        }
        $scope.languages.push(option);
      });
    }).error(function (data, status) {
      console.log('Error getting list of languages');
    });


    $scope.user = {
      native: "English",
      learning: "English"
    };

    $scope.getCurrentUser = Auth.getCurrentUser;

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
  });
