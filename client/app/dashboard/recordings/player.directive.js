angular.module('jabbrApp').directive('circleplay', [function () {
    return {
        restrict: 'E',
        template: '<div class="control-overlay"><h3 class="text-center">With {{recording.partner}} on {{parseDate(recording.date)}}</h3><button id="pButton" class="play center-block" ng-click="play()"><i class="fa fa-play-circle fa-2x"></i></button><button ng-click="changeSpeed()"class="center-block">Change Speed</button><div class="time-display"><h3 class="text-center"><span class="track-time"></span> / <span class="track-duration"></span></h3></div><div class="interface"><button class="center-block btn btn-md" ng-click="showStepOne()" ng-show="!commentStepOne && !commentStepTwo">Create Marker</button><div ng-show="commentStepOne"><p class="text-center">Select two points on the outside track to create a marker</p><h3 class="text-center"><span class="from-time"></span> - <span class="to-time"></span></h3><button class="center-block btn btn-md" ng-click="showStepTwo()">Mark</button><button class="center-block btn btn-md" ng-click="cancelMark()">Cancel</button></div><div ng-show="commentStepTwo"><form class="form" name="form" ng-submit="saveMarker(markerText)" novalidate><div class="form-group"><label>Marker Text</label><textarea type="text" ng-model="markerText" name="text" class="form-control" ng-model="comment.text" required></textarea></div><button class="btn btn-inverse btn-lg btn-login center-block" type="submit">Save Marker</button><button class="center-block btn btn-md" ng-click="cancelMark()">Cancel</button></form></div><div class="marker-panel"></div></div></div><svg id="svg-player" width="700" height="700" viewbox="0 0 700 700"><circle id="larger-circle" cx="350" cy="350" r="349" /><path id="border" transform="translate(350, 350)"/><circle id="center-circle" cx="350" cy="350" r="325"/><line id="first-edge" x1="0" y1 = "0" transform="translate(350, 350)" stroke-width="3" stroke="#396CFF" /><path id="marker-edit" transform="translate(350, 350)"/><circle id="top-circle" cx="350" cy="350" r="305" /></svg>',
        replace: false,
        link: function (scope, element, attrs) {
            var audioSrc = attrs.src;
            var audio = new Audio(audioSrc);
            var s = Snap("#svg-player");
            var largerCircle = Snap('#larger-circle');
            var track = Snap('#border');
            var topCircle = Snap('#top-circle');
            var trackTime = $('.track-time');
            var trackDuration = $('.track-duration')
            var fromTime = $('.from-time');
            var toTime = $('.to-time');
            var markerPanel = $('.marker-panel');
            toTime.text("00:00");
            fromTime.text("00:00");
            // var commentBox = $('.comment-row');
            // var commentText = $('#commentText');
            scope.duration = undefined;
            scope.minutes = undefined;
            scope.seconds = undefined;
            scope.markerPanelOpen = false;
            scope.comment = {};
            var circleCenterX = 350;
            var circleCenterY = 350;
            var play = false;
            var slowedDown = false;
            var looping = false;
            // var timelineWidth = timeline.width();
            // var timelineOffset = timeline.offset().left;
            var loader = document.getElementById('loader')
              , border = document.getElementById('border')
              , firstEdge = document.getElementById('first-edge')
              , markerEdit = document.getElementById('marker-edit')
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
            // the text that accompanies each marker when it's makde
            scope.markerText = '';

            scope.currentMarkerText = '';
            // text 

            // shows instructions and form for marking up a track
            scope.showStepOne = function() {
              scope.commentStepOne = true;
              markerMode = true;
              markerPanel.empty();
            };

            // ensures that the two time bounds for a marker are defined and then shows commenting step
            scope.showStepTwo = function(form) {
              if(scope.comment.fromTime && scope.comment.toTime) {
                scope.commentStepOne = false;
                scope.commentStepTwo = true;
                markerMode = false;
              }
            };

            scope.changeSpeed = function() {
              if(!slowedDown) {
                audio.playbackRate = 0.8;
                slowedDown = true;
              } else {
                audio.playbackRate = 1.0;
                slowedDown = false;
              }
            };

            scope.cancelMark = function() {
              scope.commentStepOne = false;
              scope.commentStepTwo = false;
              scope.comment = {};
              toTime.text("00:00");
              fromTime.text("00:00");
              markerEdit.setAttribute('d', '');
            }
            scope.submitMarker = function(form) {
              if(form.isValid) {
                console.log("submitted");
              }
            }

            largerCircle.click(function(event) {
              if(!markerMode) {
                moveTrack(event);
              } else {
                makeMark(event);
              }
            });

            track.click(function(event) {
              if(!markerMode) {
              moveTrack(event);
            } else {
              makeMark(event);
            }
            });

            audio.addEventListener("canplay", function () {
              scope.duration = audio.duration;
              trackTime.text('00:00');
              if (isNaN(scope.duration)){
                trackDuration.text('00:00');
              } 
              else {
                var time = formatSecondsAsTime(Math.floor(scope.duration).toString());
                trackDuration.text(time);
                scope.minutes = parseInt(time.split(":")[0]);
                console.log(scope.minutes);
              }
              scope.Audio.get(scope.recording.filename, function(recording, status) {
                for(var i = 0; i < recording.comments.length; i++) {

                  var marker = s.path(drawMarker(recording.comments[i])).attr({
                    transform: "translate(350,350)",
                    fill: "#396CFF"
                  });
                  topCircle.before(marker);
                  marker.data('fromTime', recording.comments[i].fromTime);
                  marker.data('toTime', recording.comments[i].toTime);
                  marker.data('text', recording.comments[i].body);
                  marker.addClass('marker');
                  marker.click(function(e){
                    if(looping) {looping = false};
                    var thisMarker = this;
                    var radians = radiansFromSeconds(this.data('fromTime'));
                    audio.currentTime = audio.duration * (radians/(2 * π));
                    if(!play) {
                      draw();
                    }
                    markerPanel.empty(); // clear if there's already one
                    var text = $('<h4>').text(this.data('text'));
                    var loopButton = $('<button>').text("Loop Marker");
                    loopButton.on('click', function(e) {
                      looping = !looping;
                      playLoop(thisMarker.data('fromTime'), thisMarker.data('toTime'));
                    });
                    markerPanel.append(text, loopButton);
                  });
                }
              });
            }, false);


            var makeMark = function(e) {
              radians = radiansFromPosition(e);
              var time = (radians / (2 * π)) * scope.duration;
              if(scope.comment.fromTime === undefined) {
                scope.comment.fromTime = time;
                fromTime.text(formatSecondsAsTime(Math.floor(time).toString()));
                drawFirstEdge(radians);
              } else {
                firstEdge.setAttribute("x2", 0);
                firstEdge.setAttribute("y2", 0);
                if(time >= scope.comment.fromTime) {
                  scope.comment.toTime = time;
                  toTime.text(formatSecondsAsTime(Math.floor(time).toString()));
                  drawMarkEdit(radiansFromSeconds(scope.comment.fromTime), radians);
                } else {
                  scope.comment.toTime = scope.comment.fromTime;
                  scope.comment.fromTime = time;
                  fromTime.text(formatSecondsAsTime(Math.floor(time).toString()));
                  toTime.text(formatSecondsAsTime(Math.floor(scope.comment.toTime).toString()));
                  drawMarkEdit(radians, radiansFromSeconds(scope.comment.toTime));
                }
              }
            };

            scope.saveMarker = function(markerText) {
              scope.comment.body = markerText; 
              scope.Audio.update(scope.recording.filename, scope.comment, function(recording) {
                scope.comment = {};
                toTime.text("00:00");
                fromTime.text("00:00");
                scope.commentStepTwo = false;
                var comment = recording.comments[recording.comments.length - 1];
                markerEdit.setAttribute('d', '');
                var marker = s.path(drawMarker(comment)).attr({
                    transform: "translate(350,350)",
                    fill: "#396CFF"
                  });
                  topCircle.before(marker);
                  marker.data('fromTime', comment.fromTime);
                  marker.data('toTime', comment.toTime);
                  marker.data('text', comment.body);
                  marker.addClass('marker');
                  marker.click(function(e){
                    if(looping) {looping = false};
                    var thisMarker = this;
                    var radians = radiansFromSeconds(this.data('fromTime'));
                    audio.currentTime = audio.duration * (radians/(2 * π));
                    if(!play) {
                      draw();
                    }
                    markerPanel.empty(); // clear if there's already one
                    var text = $('<h4>').text(this.data('text'));
                    var loopButton = $('<button>').text("Loop Marker");
                    loopButton.on('click', function(e) {
                      looping = !looping;
                      playLoop(thisMarker.data('fromTime'), thisMarker.data('toTime'));
                    });
                    markerPanel.append(text, loopButton);
                  });
              });
            };

            var playLoop = function(from, to) {
              console.log('calling again');
              if(looping) {
                audio.currentTime = from;
                if(audio.paused) {
                  scope.play();
                }
                window.setTimeout(playLoop, (to - from) *  1000, from, to);
              }
            };

            var drawMarker = function(marker) {
              var to = radiansFromSeconds(marker.toTime);
              var from = radiansFromSeconds(marker.fromTime);
              var x1 = Math.sin( from ) * 325
                , y1 = Math.cos( from ) * -325 
                , x2 = Math.sin( to ) * 325
                , y2 = Math.cos( to ) * -325
                , mid = ( to - from > π ) ? 1 : 0;
              console.log(x1, y1);
              console.log(x2, y2);
              return 'M 0 0 L ' + x1 + ' ' + y1 + ' A 325 325 1 ' 
                       + mid + ' 1 ' 
                       +  x2  + ' ' 
                       +  y2  + ' z';
            };

            var drawMarkEdit = function(from, to) {
              var x1 = Math.sin( from ) * 325
                , y1 = Math.cos( from ) * -325 
                , x2 = Math.sin( to ) * 325
                , y2 = Math.cos( to ) * -325
                , mid = ( to - from > π ) ? 1 : 0;
              console.log(x1, y1);
              console.log(x2, y2);
              var anim = 'M 0 0 L ' + x1 + ' ' + y1 + ' A 325 325 1 ' 
                       + mid + ' 1 ' 
                       +  x2  + ' ' 
                       +  y2  + ' z';

              markerEdit.setAttribute('d', anim);
            };
            var radiansFromSeconds = function(seconds) {
              return (seconds/scope.duration) * (2 * π);
            }

            var drawFirstEdge = function(radians) {

              var x = Math.sin( radians ) * 325
                , y = Math.cos( radians ) * -325;
              firstEdge.setAttribute( 'x2', x);
              firstEdge.setAttribute('y2', y);
            };

            var moveTrack = function(e) {
              var radians = radiansFromPosition(e);
              audio.currentTime = audio.duration * (radians/(2 * π));
              if(!play) {
                draw();
              }
            }

            var radiansFromPosition = function(e) {
              var x = (e.offsetX - 350);
              var y = (e.offsetY - 350);
              var radius = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
              if(y < 0 && x >= 0) {
                return -Math.atan((x/radius)/(y/radius));
              } else if (y >= 0 && x >= 0){
                return π - Math.atan((x/radius)/(y/radius));
              } else if (y >= 0 && x < 0) {
                return π - Math.atan((x/radius)/(y/radius));
              } else if (y < 0 && x < 0) {
                return 2*π - Math.atan((x/radius)/(y/radius));
              }
            };

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
                    if(looping) {
                      looping = false;
                    }
                    audio.pause();
                }
            };


        }
    }
}]);

