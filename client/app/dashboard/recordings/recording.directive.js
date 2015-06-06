angular.module('jabbrApp').directive('player', [function () {
    return {
        restrict: 'E',
        template: '<button id="pButton" class="play" ng-click="play()"><i class="fa fa-play-circle fa-2x"></i></button><div ng-click="clickTimeline($event)" id="timeline"><div id="playhead"></div></div>',
        replace: false,
        link: function (scope, element, attrs) {
            var audioSrc = attrs.src;
            var audio = new Audio(audioSrc);
            var playhead = $('#playhead');
            var timeline = $('#timeline');
            var duration;
            var timelineWidth = timeline.width() - playhead.width(); // adjust width of timeline for playhead
            var timelineOffset = timeline.offset().left;

            scope.clickTimeline = function(event) {
              moveplayhead(event);
              audio.currentTime = duration * clickPercent(event);
            }
            audio.addEventListener('timeupdate', function() {
              var playPercent = 100 * (parseInt(audio.currentTime, 10) / audio.duration);
              playhead.css('margin-left', playPercent + '%');
            });

            audio.addEventListener("canplaythrough", function () {
              duration = audio.duration;
            }, false);

            function moveplayhead(e) {
              var newMargLeft = e.pageX - timelineOffset;
              if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
                playhead.css('marginLeft', newMargLeft + "px");
              }
              if (newMargLeft < 0) {
                playhead.css('marginLeft', "0px");
              }
              if (newMargLeft > timelineWidth) {
                playhead.css('marginLeft', timelineWidth + "px");              }
            };

            function clickPercent(e) {
              return (e.pageX - timelineOffset) / timelineWidth;
            };
          
            scope.play = function () {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            };


        }
    }
}]);