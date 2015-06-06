angular.module('jabbrApp').directive('soundButton', [function () {
    return {
        restrict: 'E',
        template: '<div class="player gradient"><a class="button gradient" ng-click="play()" id="play" href="" title="Play">Play</a><a class="button gradient" id="mute" href="" title=""></a><input type="range" id="seek" value="0" max=""/><a class="button gradient" id="close" href="" title=""></a></div>',
        replace: false,
        link: function (scope, element, attrs) {
            var audioSrc = attrs.src;
            var audio = new Audio(audioSrc);

            scope.play = function () {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            };

            element.bind('mouseover', function() {
              element.css('cursor', 'pointer');
            });

        }
    }
}]);