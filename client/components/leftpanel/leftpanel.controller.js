angular.module('jabbrApp')
  .controller('LeftPanelCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/dashboard'
      }, {
        'title': 'My Saved Sessions',
        'link': '/sessions'
      }, {
        'title': 'My Practice Deck',
        'link': '/deck'
      }, {
        'title': 'My Partners',
        'link': '/partners'
      }, {
        'title': 'My Messages',
        'link': '/messages'
      }, {
        'title': 'My Profile',
        'link': '/profile'
      }, {
        'title': 'My Preferences',
        'link': '/preferences'
      }
    ];
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });