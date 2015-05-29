'use strict';

describe('Controller: MyprofileCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var MyprofileCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyprofileCtrl = $controller('MyprofileCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
