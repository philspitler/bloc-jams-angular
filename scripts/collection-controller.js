angular.module('blocJams').controller('Collection.controller', function ($scope, Fixtures) {
  $scope.albums = Fixtures.getCollection(10);
});
