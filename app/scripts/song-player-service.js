angular.module('blocJams').factory('SongPlayer', function($window) {
  var currentSong = {
    stop: function() {},
    setPercent: function() {},
    setVolume: function () {},
    appData: {}
  };

  var toggle = function() {
    currentSong.togglePlay();
  };

  var play = function(song) {
    currentSong.stop();

    currentSong = new $window.buzz.sound(song.audioUrl, {
      formats: ['mp3'],
      preload: true
    });

    song.duration = $window.buzz.toTimer(currentSong.getDuration());

    currentSong.appData = song;

    currentSong.play();
  };

  var isCurrentSongLoaded = function(song) {
    return (song === currentSong.appData);
  };

  return {
    playOrPause: function(song) {
      var toggled = isCurrentSongLoaded(song) ? toggle() : play(song);
      return song;
    },
    getVolume: function () {
      return currentSong.getVolume();
    },
    setVolume: function(volume) {
      currentSong.setVolume(volume);
    },
    onVolumeChange: function(callback) {
      currentSong.bind('volumechange', function(e) {
        callback(this.getVolume());
      });
    },
    setPercent: function(percent) {
      currentSong.setPercent(percent);
    },
    timeUpdate: function(callback) {
      currentSong.bind('timeupdate', function(e) {
        var timer = $window.buzz.toTimer(this.getTime());
        callback({
          time: timer,
          percent: this.getPercent()
        });
      });
    },
    getDuration: function(callback) {
      currentSong.bind('loadedmetadata', function(e) {
        var duration = $window.buzz.toTimer(currentSong.getDuration());
        callback(duration);
      });
    }
  };
});
