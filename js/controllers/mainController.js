function MainCtrl($scope, $firebaseArray, $location, $log, $filter, $http, $window, $rootScope, $firebaseAuth, Auth, toaster) {
    var FURL = 'https://eventsboard.firebaseio.com/profiles';
    var ref = new Firebase(FURL);
    var uid;
    $scope.user = Auth.user;
    uid = Auth.user.uid;

    if (uid === undefined) {
        $location.path('#/events');
        console.log('uid was undefined, changed path to #/events');
    }

    var eventsRef = $firebaseArray(ref.child(uid).child('slides'));
    $scope.displayLoadingIndicator = true;

    eventsRef.$loaded()
        .then(function(x) {
            $scope.displayLoadingIndicator = false;
            $scope.events = eventsRef;
            x === eventsRef; // true
        })
        .catch(function(error) {
            console.log("Error:", error);
        });

    $scope.getSlides = function() {
        if (eventsRef !== null) {
            $scope.events = eventsRef;
        }
    };

    $scope.getSlides();

    var events = $scope.events;

    //Display:
    var sdkInfo = function() {
        var encodedId = btoa(uid);
        var slicedId = encodedId.slice(0, -1);
        return slicedId;
    };
    $scope.sdkInfo = sdkInfo();



    var displayUrlParam;

    // Start event creator

    // new event object
    $scope.newEvent = {
        name: "",
        date: new Date(),
        time: new Date()
    };

    var getUTF8Length = function() {
        var string = $scope.file.base64;
        var utf8length = 0;
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utf8length++;
            } else if ((c > 127) && (c < 2048)) {
                utf8length = utf8length + 2;
            } else {
                utf8length = utf8length + 3;
            }
        }
        return utf8length;
        console.log(utf8length);
    };

    $scope.saveEvent = function(event) {
        var filestring = $scope.file.base64;
        if (getUTF8Length(filestring) > 9000000) {
            $log.debug('too big');
        } else {
            var newEvent = {};
            newEvent.name = $scope.newEvent.name;
            var newtime = $scope.newEvent.time;
            newEvent.time = newtime.getTime();
            var newdate = $scope.newEvent.date;
            newEvent.date = newdate.getTime();
            var dtstring = getDateTime();
            newEvent.datetime = dtstring.getTime();
            newEvent.datetimestring = $scope.datetimestring;
            newEvent.src = $scope.file.base64;
            newEvent.format = $scope.file.filetype;
            eventsRef.$add(newEvent).then(function(ref) {
                console.log("Event added.");
                toaster.pop('success', 'Event added!');
            }, function(error) {
                console.log("Error:", error);
            });
            $scope.newEvent.date = new Date();
            $scope.newEvent.time = new Date();
            $scope.newEvent.name = '';
            $scope.file = false;
            $('#fileMobile').val('');
        }
    };

    $scope.remove = function(event) {

        $scope.events.$remove(event);
    };


    // transform date objects for Firebase
    var getDateTime = function() {
        var date = $scope.newEvent.date;
        var newdate = new Date(date);
        var month = newdate.getMonth() + 1;
        var day = newdate.getDate();
        var year = newdate.getFullYear();
        var time = $scope.newEvent.time;
        var newtime = new Date(time);
        var hour = newtime.getHours();
        if (hour < 10)
            hour = "0" + hour;
        var min = newtime.getMinutes();
        if (min < 10)
            min = "0" + min;
        var sec = newtime.getSeconds();
        if (sec < 10)
            sec = "0" + sec;
        var datestring = month + '/' + day + '/' + year;
        var timestring = hour + ':' + min + ':' + sec + ' GMT-0700 (PDT)';
        var datetimestring = datestring + ' ' + timestring;
        $scope.datetimestring = datetimestring;
        datetimestring = new Date(datetimestring);
        return datetimestring;
    };

    // File picker
    // Reject if it is greater than 10MB
    $scope.onChange = function() {
        if (getUTF8Length($scope.file.base64) > 9000000) {
            toaster.pop('error', 'Image is too big! Try something under 10MB.');
            $('#fileMobile').val('');
            $scope.file = false;
        }
    };

    $scope.onLoad = function(e, reader, file, fileList, fileOjects, fileObj) {
        console.log('this is handler for file reader onload event!');
    };

    // var uploadedCount = 0;

    // $scope.files = [];

    // end file picker

    // timepicker
    $scope.newEvent.time = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };
    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };
    $scope.update = function() {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.newEvent.time = d;
    };
    $scope.changed = function() {
        $log.log('Time changed to: ' + $scope.newEvent.time);
    };
    $scope.clear = function() {
        $scope.newEvent.time = null;
    };
    // end timepicker


    // datepicker 

    $scope.today = function() {
        $scope.newEvent.date = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.newEvent.date = null;
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);



};





angular
    .module('eventsBoard')
    .controller('MainCtrl', MainCtrl)
