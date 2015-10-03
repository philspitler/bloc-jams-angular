angular.module('blocJams').factory('SongPlayer', function($window) {
  var currentSong = {
    stop: function() {},
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

    currentSong.appData = song;

    currentSong.play();
  };

  var isCurrentSongLoaded = function(song) {
    return (song === currentSong.appData);
  };

  return {
    playOrPause: function(song) {
      
      isCurrentSongLoaded(song) ? toggle() : play(song);
      return song;
    },
    setTime: currentSong.setTime,
    toggleMute: currentSong.toggleMute,
    setVolume: currentSong.setVolume
  };
});
