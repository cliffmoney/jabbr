'use strict';

describe('Controller: PartnersCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var PartnersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PartnersCtrl = $controller('PartnersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
