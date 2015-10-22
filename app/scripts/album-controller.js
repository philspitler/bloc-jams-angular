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

    $scope.setTime = function(event) {
      SongPlayer.setPercent(Math.round((event.offsetX / document.getElementById('seek-bar').clientWidth) * 100));
    };

    $scope.setVolumeControls = function(volume) {
      // var volumePercentNumber = Math.round((event.offsetX / document.getElementById('volume-bar').clientWidth) * 100);
      $scope.volumeFillStyles = {width: volume + '%'};
      $scope.volumeThumbStyles = {left: volume + '%'};
    };

    $scope.setVolume = function(volume) {
      SongPlayer.setVolume(volume);
    };

    $scope.setVolumeAndControls = function(volume) {
      $scope.setVolume(volume);
      $scope.setVolumeControls(volume);
    };

    var isPressed = false;
    $scope.thumbMove = function(event) {
      if (isPressed) {
      console.log('move');
      console.log(event);
    }
    };
    $scope.thumbDown = function(event) {
      isPressed = true;

    };

    $scope.thumbUp = function(event) {
      isPressed = false;

      console.log(isPressed);
    };

    $scope.playOrPause = function(song) {
      resetSongs(song);
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
  });
}());
