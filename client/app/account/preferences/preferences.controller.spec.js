'use strict';

describe('Controller: PreferencesCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var PreferencesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreferencesCtrl = $controller('PreferencesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
