(function() {
  'use strict';
  angular.module('blocJams').controller('Album.controller', function($scope, Fixtures, SongPlayer) {
    var resetSongs = function (song) {
      $scope.album.songs.forEach(function (item) {
        if (item !== song) {
          item.playing = false;
        }
      });
    };
    $scope.album = Fixtures.getAlbum();
    $scope.currentSong = {
      audioUrl: {}
    };

    $scope.playOrPause = function(song) {
      resetSongs(song);
      song.playing = !song.playing;
      $scope.currentSong = SongPlayer.playOrPause(song);
    };
  });
}());
