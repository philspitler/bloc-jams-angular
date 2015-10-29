angular.module('blocJams').directive('slider', function($document, SongPlayer) {
  return {
    restrict: 'E',
    scope: {},
    template: '<div class="seek-bar"><div class="fill"></div><div class="thumb"></div></div>',
    link: function(scope, element, attrs) {
      var updateSeekPercentage = function(seekBar, seekBarFillRatio) {
        var offsetXPercent = seekBarFillRatio * 100;
        offsetXPercent = Math.max(0, offsetXPercent);
        offsetXPercent = Math.min(100, offsetXPercent);

        var percentageString = offsetXPercent + '%';
        seekBar.find('.fill').width(percentageString);
        seekBar.find('.thumb').css({
          left: percentageString
        });
      };

      scope.seek = function(amount) {
        SongPlayer.setPercent(amount);
      };

      scope.volume = function(amount) {
        SongPlayer.setVolume(amount);
      };

      scope.timeUpdate = function() {
        SongPlayer.timeUpdate(function(timeData) {
          updateSeekPercentage(this, timeData.percent);
        });
      };

      //CLICKING THE SEEKBAR
      element.find('.seek-bar').click(function(event) {
        var offsetX = event.pageX - angular.element(this).offset().left;
        var barWidth = angular.element(this).width();
        var seekBarFillRatio = offsetX / barWidth;
        updateSeekPercentage(angular.element(this), seekBarFillRatio);
      });

      //DRAGGING THE 'THUMB'
      element.find('.thumb').mousedown(function(event) {
        var seekBar = angular.element(this).parent();

        $document.bind('mousemove.thumb', function(event) {
          var offsetX = event.pageX - seekBar.offset().left;
          var barWidth = seekBar.width();
          var seekBarFillRatio = offsetX / barWidth;
          scope[attrs.action](parseInt(seekBarFillRatio * 100));
          // if (seekBar.parent().attr('class') == 'seek-control') {
          //   seek(seekBarFillRatio * currentSoundFile.getDuration());
          // } else {
          //   setVolume(seekBarFillRatio);
          // }
          updateSeekPercentage(seekBar, seekBarFillRatio);
        });
        $document.bind('mouseup.thumb', function() {
          $document.unbind('mousemove.thumb');
          $document.unbind('mouseup.thumb');
        });
      });
    }
  };
});
