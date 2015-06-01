'use strict';

describe('Controller: PartnershipCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var PartnershipCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PartnershipCtrl = $controller('PartnershipCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
