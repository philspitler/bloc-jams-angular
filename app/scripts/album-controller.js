angular.module('blocJams').controller('Album.controller', function ($scope, Fixtures) {
  $scope.album = Fixtures.getAlbum();
});
