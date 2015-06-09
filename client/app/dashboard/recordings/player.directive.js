angular.module('jabbrApp').directive('circleplay', [function () {
    return {
        restrict: 'E',
        template: '<div class="control-overlay"><h3 class="text-center">With {{recording.partner}} on {{parseDate(recording.date)}}</h3><button id="pButton" class="play center-block" ng-click="play()"><i class="fa fa-play-circle fa-2x"></i></button><div class="time-display"><h3 class="text-center"><span class="track-time"></span> / <span class="track-duration"></span></h3></div><div class="interface"><button class="center-block btn btn-md" ng-click="showStepOne()" ng-show="!commentStepOne && !commentStepTwo">Create Marker</button><div ng-show="commentStepOne"><button class="center-block btn btn-md" ng-click="showStepTwo()">Mark</button><p class="cut-error" ng-show="cutError">Select two points or times to mark the track</p></div><div ng-show="commentStepTwo">hey</div></div></div><svg id="svg-player" width="700" height="700" viewbox="0 0 700 700"><circle id="larger-circle" cx="350" cy="350" r="349" /><path id="border" transform="translate(350, 350)"/><circle id="center-circle" cx="350" cy="350" r="325"/></svg>',
        replace: false,
        link: function (scope, element, attrs) {
            var audioSrc = attrs.src;
            var audio = new Audio(audioSrc);
            var largerCircle = Snap('#larger-circle');
            var track = Snap('#border');
            var trackTime = $('.track-time');
            var trackDuration = $('.track-duration')
            // var commentBox = $('.comment-row');
            // var commentText = $('#commentText');
            var duration;
            var circleCenterX = 350;
            var circleCenterY = 350;
            var play = false;
            // var timelineWidth = timeline.width();
            // var timelineOffset = timeline.offset().left;
            var loader = document.getElementById('loader')
              , border = document.getElementById('border')
              , α = 0
              , π = Math.PI;

            scope.commentStepOne = false;
            scope.commentStepTwo = false;
            scope.cutError = false;

            // by default user cannot mark up the audio track
            var markerMode = false; 
            // these two variables used to define the time bounds of a marker
            scope.timeOne = undefined;  
            scope.timeTwo = undefined;
            // the text that accompanies each marker
            scope.markerText = '';

            // shows instructions and form for marking up a track
            scope.showStepOne = function() {
              scope.commentStepOne = true;
              markerMode = true;
            };

            // ensures that the two time bounds for a marker are defined and then shows commenting step
            scope.showStepTwo = function(form) {
              if(form.isValid) {
                scope.commentStepOne = false;
                scope.commentStepTwo = true;
              }
            };

            scope.submitMarker = function(form) {
              if(form.isValid) {
                console.log("submitted");
              }
            }

            largerCircle.click(function(event) {
              moveTrack(event);
            });

            track.click(function(event) {
              moveTrack(event);
            });

            audio.addEventListener("canplaythrough", function () {
              duration = audio.duration;
              trackTime.text('00:00');
              if (isNaN(duration)){
                trackDuration.text('00:00');
              } 
              else {
                trackDuration.text(formatSecondsAsTime(Math.floor(duration).toString()));
              }
            }, false);

            var moveTrack = function(e) {
              var x = (e.offsetX - 350);
              var y = (e.offsetY - 350);
              var radius = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
              var radians;
              if(y < 0 && x >= 0) {
                radians = -Math.atan((x/radius)/(y/radius));
              } else if (y >= 0 && x >= 0){
                radians = π - Math.atan((x/radius)/(y/radius));
              } else if (y >= 0 && x < 0) {
                radians = π - Math.atan((x/radius)/(y/radius));
              } else if (y < 0 && x < 0) {
                radians = 2*π - Math.atan((x/radius)/(y/radius));
              }
              audio.currentTime = audio.duration * (radians/(2 * π));
              if(!play) {
                draw();
              }
            }

            var draw = function() {
              α = 360 * (parseFloat(audio.currentTime)/audio.duration);

              var r = ( α * π / 180 )
                , x = Math.sin( r ) * 350
                , y = Math.cos( r ) * -350
                , mid = ( α > 180 ) ? 1 : 0
                , anim = 'M 0 0 v -350 A 350 350 1 ' 
                       + mid + ' 1 ' 
                       +  x  + ' ' 
                       +  y  + ' z';
              //[x,y].forEach(function( d ){
              //  d = Math.round( d * 1e3 ) / 1e3;
              //});
              
              
              border.setAttribute( 'd', anim );
              if(play)
                setTimeout(draw, 30);
            };
          
            
            audio.addEventListener('timeupdate', function() {
              trackTime.text(formatSecondsAsTime(Math.floor(audio.currentTime).toString()));
            });

            function formatSecondsAsTime(secs, format) {
              var hr  = Math.floor(secs / 3600);
              var min = Math.floor((secs - (hr * 3600))/60);
              var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

              if (min < 10){ 
                min = "0" + min; 
              }
              if (sec < 10){ 
                sec  = "0" + sec;
              }

              return min + ':' + sec;
            };

            scope.play = function () {
                if (audio.paused) {
                    play = true;
                    draw();
                    audio.play();
                } else {
                    play = false;
                    audio.pause();
                }
            };




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

