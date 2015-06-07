angular.module('jabbrApp').directive('circleplay', [function () {
    return {
        restrict: 'E',
        template: '<svg width="700" height="700" viewbox="0 0 250 250"><path id="border" transform="translate(125, 125)"/><path id="loader" transform="translate(125, 125) scale(.84)"/></svg>',
        replace: false,
        link: function (scope, element, attrs) {
            // var audioSrc = attrs.src;
            // var audio = new Audio(audioSrc);
            // var playhead = $('#playhead');
            // var timeline = $('#timeline');
            // var commentBox = $('.comment-row');
            // var commentText = $('#commentText');
            // var duration;
            // var timelineWidth = timeline.width();
            // var timelineOffset = timeline.offset().left;

            var loader = document.getElementById('loader')
              , border = document.getElementById('border')
              , α = 0
              , π = Math.PI
              , t = 30;

            (function draw() {
              α++;
              α %= 360;
              var r = ( α * π / 180 )
                , x = Math.sin( r ) * 125
                , y = Math.cos( r ) * - 125
                , mid = ( α > 180 ) ? 1 : 0
                , anim = 'M 0 0 v -125 A 125 125 1 ' 
                       + mid + ' 1 ' 
                       +  x  + ' ' 
                       +  y  + ' z';
              //[x,y].forEach(function( d ){
              //  d = Math.round( d * 1e3 ) / 1e3;
              //});
             
              loader.setAttribute( 'd', anim );
              border.setAttribute( 'd', anim );
              
              setTimeout(draw, t); // Redraw
            })();

            // audio.addEventListener('timeupdate', function() {
            //   var playPercent = 100 * (parseInt(audio.currentTime, 10) / audio.duration);
            //   playhead.css('margin-left', playPercent + '%');
            // });

            // audio.addEventListener("canplaythrough", function () {
            //   duration = audio.duration;
            //   scope.Audio.get(scope.recording.filename, function(comments, status) {
            //     for(var i = 0; i < comments.comments.length; i++) {
            //       var $comment = $("<div>", {class: "comment"});
            //       $comment.css('left', positionFromTime(comments.comments[i].time) + 'px');
            //       $comment.data('text', comments.comments[i].body);
            //       $comment.on('click', function(e) {
            //         commentText.text($(this).data('text'));
            //       });
            //       commentBox.append($comment);
            //     }
            //   });
            // }, false);


            // var positionFromTime = function(commentTime) {
            //   var time = parseFloat(commentTime);
            //   console.log(time);
            //   console.log(duration);
            //   console.log(timelineWidth);
            //   return timelineWidth * (time/duration);
            // }

            // scope.addComment = function(textOfComment) {
            //   var comment = {};
            //   comment.time = audio.currentTime; 
            //   comment.body = textOfComment;
            //   scope.Audio.update(scope.recording.filename, comment, function(comment) {
            //     var $comment = $("<div>", {class: "comment"});
            //     var latestComment = comment.comments[comment.comments.length - 1];
            //     $comment.css('left', positionFromTime(latestComment.time) + 'px');
            //     $comment.data('text', latestComment.body);
            //     $comment.on('click', function(e) {
            //       commentText.text($(this).data('text'));
            //     });
            //     commentBox.append($comment);
            //   });
            // };

            // scope.clickTimeline = function(event) {  // sets playhead to the spot clicked on timeline
            //   moveplayhead(event);
            //   audio.currentTime = duration * clickPercent(event);
            // };


            // function moveplayhead(e) {
            //   var newMargLeft = e.pageX - timelineOffset;
            //   if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            //     playhead.css('marginLeft', newMargLeft + "px");
            //   }
            //   if (newMargLeft < 0) {
            //     playhead.css('marginLeft', "0px");
            //   }
            //   if (newMargLeft > timelineWidth) {
            //     playhead.css('marginLeft', timelineWidth + "px");              }
            // };

            // function clickPercent(e) {
            //   return (e.pageX - timelineOffset) / timelineWidth;
            // };
          
            // scope.play = function () {
            //     if (audio.paused) {
            //         audio.play();
            //     } else {
            //         audio.pause();
            //     }
            // };


        }
    }
}]);