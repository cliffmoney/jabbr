angular.module('jabbrApp').directive('soundButton', [function () {
    return {
        restrict: 'E',
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

            element.css({
                borderRadius: '50%',
                width: '100px',
                height: '100px', 
                backgroundColor: 'red',
                display: 'inline-block'
            });

        }
    }
}]);