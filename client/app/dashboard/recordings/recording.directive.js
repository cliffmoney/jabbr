angular.module('jabbrApp').directive('player', [function () {
    return {
        restrict: 'E',
        template: '<button id="pButton" class="play center-block" ng-click="play()"><i class="fa fa-play-circle fa-2x"></i></button><div ng-click="clickTimeline($event)" id="timeline"><div id="playhead"></div></div><div class="comment-row"><h2 class="text-center" id="commentText"></h2></div><div class="form-row"><form class="form form-inline text-center" ng-submit="addComment(comment)"><input class="form-control" type="text" ng-model="comment" placeholder="Add comment"><input class="btn btn-lg btn-primary" type="submit"></form></div>',
        replace: false,
        link: function (scope, element, attrs) {
            var audioSrc = attrs.src;
            var audio = new Audio(audioSrc);
            var playhead = $('#playhead');
            var timeline = $('#timeline');
            var commentBox = $('.comment-row');
            var commentText = $('#commentText');
            var duration;
            var timelineWidth = timeline.width();
            var timelineOffset = timeline.offset().left;

            audio.addEventListener('timeupdate', function() {
              var playPercent = 100 * (parseInt(audio.currentTime, 10) / audio.duration);
              playhead.css('margin-left', playPercent + '%');
            });

            audio.addEventListener("canplaythrough", function () {
              duration = audio.duration;
              scope.Audio.get(scope.recording.filename, function(comments, status) {
                for(var i = 0; i < comments.comments.length; i++) {
                  var $comment = $("<div>", {class: "comment"});
                  $comment.css('left', positionFromTime(comments.comments[i].time) + 'px');
                  $comment.data('text', comments.comments[i].body);
                  $comment.on('click', function(e) {
                    commentText.text($(this).data('text'));
                  });
                  commentBox.append($comment);
                }
              });
            }, false);


            var positionFromTime = function(commentTime) {
              var time = parseFloat(commentTime);
              console.log(time);
              console.log(duration);
              console.log(timelineWidth);
              return timelineWidth * (time/duration);
            }

            scope.addComment = function(textOfComment) {
              var comment = {};
              comment.time = audio.currentTime; 
              comment.body = textOfComment;
              scope.Audio.update(scope.recording.filename, comment, function(comment) {
                var $comment = $("<div>", {class: "comment"});
                var latestComment = comment.comments[comment.comments.length - 1];
                $comment.css('left', positionFromTime(latestComment.time) + 'px');
                $comment.data('text', latestComment.body);
                $comment.on('click', function(e) {
                  commentText.text($(this).data('text'));
                });
                commentBox.append($comment);
              });
            };

            scope.clickTimeline = function(event) {  // sets playhead to the spot clicked on timeline
              moveplayhead(event);
              audio.currentTime = duration * clickPercent(event);
            };


            function moveplayhead(e) {
              var newMargLeft = e.pageX - timelineOffset;
              if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
                playhead.css('marginLeft', newMargLeft + "px");
              }
              if (newMargLeft < 0) {
                playhead.css('marginLeft', "0px");
              }
              if (newMargLeft > timelineWidth) {
                playhead.css('marginLeft', timelineWidth + "px");              
              }
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