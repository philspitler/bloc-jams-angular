(function() {
  'use strict';
  angular.module('blocJams').controller('Album.controller', function($scope, Fixtures, SongPlayer) {
    var resetSongs = function(song) {
      $scope.album.songs.forEach(function(item) {
        if (item !== song) {
          item.playing = false;
        }
      });
    };

    $scope.album = Fixtures.getAlbum();

    $scope.currentSong = {
      audioUrl: {}
    };

    $scope.setTime = function(event) {
      SongPlayer.setPercent(Math.round((event.offsetX / document.getElementById('seek-bar').clientWidth) * 100));
    };

    $scope.setVolumeControls = function(volume) {
      // var volumePercentNumber = Math.round((event.offsetX / document.getElementById('volume-bar').clientWidth) * 100);
      $scope.volumeFillStyles = {
        width: volume + '%'
      };
      $scope.volumeThumbStyles = {
        left: volume + '%'
      };
    };

    $scope.setVolume = function(volume) {
      SongPlayer.setVolume(volume);
    };

    $scope.setVolumeAndControls = function(volume) {
      $scope.setVolume(volume);
      $scope.setVolumeControls(volume);
    };

    $scope.playOrPause = function(song) {
      resetSongs(song);
      $scope.songPlayer = SongPlayer;
      song.playing = !song.playing;
      $scope.currentSong = SongPlayer.playOrPause(song);
      $scope.setVolumeControls(SongPlayer.getVolume());
      SongPlayer.timeUpdate(function(timeData) {
        $scope.timeData = timeData;
        $scope.$apply();
      });
      SongPlayer.getDuration(function(duration) {
        $scope.duration = duration;
      });
    };

    $scope.playPreviousSong = function(song) {
      var prevSongIndex = $scope.album.songs.indexOf(song) - 1;
      var lastSongIndex = $scope.album.songs.length - 1;

      $scope.playOrPause((prevSongIndex === -1) ? $scope.album.songs[lastSongIndex] : $scope.album.songs[prevSongIndex]);
    };

    $scope.playNextSong = function(song) {
      var nextSongIndex = $scope.album.songs.indexOf(song) + 1;
      var lastSongIndex = $scope.album.songs.length - 1;

      $scope.playOrPause((nextSongIndex === lastSongIndex + 1) ? $scope.album.songs[0] : $scope.album.songs[nextSongIndex]);
    };
  });
}());
