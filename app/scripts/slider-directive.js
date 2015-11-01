angular.module('blocJams').directive('slider', function($document, SongPlayer) {
  // Returns a number between 0 and 1 to determine where the mouse event happened along the slider bar.
  var calculateSliderPercentFromMouseEvent = function($slider, event) {
    var offsetX = event.pageX - $slider.offset().left; // Distance from left
    var sliderWidth = $slider.width(); // Width of slider
    var offsetXPercent = (offsetX / sliderWidth);
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(1, offsetXPercent);
    return offsetXPercent;
  };

  var numberFromValue = function(value, defaultValue) {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'undefined') {
      return defaultValue;
    }

    if (typeof value === 'string') {
      return Number(value);
    }
  };
  return {
    restrict: 'E',
    replace: true,
    scope: {
      onChange: '&'
    },
    templateUrl: '/templates/slider.html',
    link: function(scope, element, attributes) {


      // These values represent the progress into the song/volume bar, and its max value.
      // For now, we're supplying arbitrary initial and max values.
      scope.value = 0;
      scope.max = 100;
      var $seekBar = $(element);

      var percentString = function() {
        var value = scope.value || 0;
        var max = scope.max || 100;
        percent = value / max * 100;
        return percent + "%";
      };

      scope.fillStyle = function() {
        return {
          width: percentString()
        };
      };

      scope.thumbStyle = function() {
        return {
          left: percentString()
        };
      };

      scope.onClickSlider = function(event) {
        var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
        scope.value = percent * scope.max;
        notifyCallback(scope.value);
      };

      scope.trackThumb = function() {
        $document.bind('mousemove.thumb', function(event) {
          var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
          scope.$apply(function() {
            scope.value = percent * scope.max;
            notifyCallback(scope.value);
          });
        });

        //cleanup
        $document.bind('mouseup.thumb', function() {
          $document.unbind('mousemove.thumb');
          $document.unbind('mouseup.thumb');
        });
      };

      attributes.$observe('value', function(newValue) {
        scope.value = numberFromValue(newValue, 0);
      });

      attributes.$observe('max', function(newValue) {
        scope.max = numberFromValue(newValue, 100) || 100;
      });
      var notifyCallback = function(newValue) {
        if (typeof scope.onChange === 'function') {
          scope.onChange({
            value: newValue
          });
        }
      };
    }
  };
});
