function MainCtrl($scope, $firebaseArray, $location, $log, $filter, $http, $window, $rootScope, $firebaseAuth, Auth) {
    // Get boardId from asset object (hardcode during dev)
    var boardid = '-JssmYghOvSlhrrNUHEc';
    var eventsRef = new Firebase("https://eventsboard.firebaseio.com/boards/" + boardid + "/slides");
    $scope.events = $firebaseArray(eventsRef);
    var events = $scope.events;

    // Start event creator

    // new event object
    $scope.newEvent = {
        name: "",
        date: new Date(),
        time: new Date()
    };


    $scope.saveEvent = function(event) {
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
        events.$add(newEvent);
        $scope.newEvent.date = new Date();
        $scope.newEvent.time = new Date();
        $scope.newEvent.name = '';
        $scope.file = false;
        $('#fileMobile').val('');
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
    $scope.onChange = function(e, fileList) {
        alert('this is on-change handler!');
    };

    $scope.onLoad = function(e, reader, file, fileList, fileOjects, fileObj) {
        alert('this is handler for file reader onload event!');
    };

    var uploadedCount = 0;

    $scope.files = [];

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

    // end datePicker

    //start Enplug SDK
    $scope.assets = []; //Setting assets to a sane default, assets come as an array of objects
    $scope.account = null; //Setting a sane default, account comes an object.
    $scope.showAdvanced = false; //Sane default for the show advanced value, used to hide/show form fields.

    /**
     * Initializing the object with known good values.
     * It is not necessary to do this, as the ng-model in the html will create these values as applicable.
     */
    $scope.page = {
        Value: {
            ShowContent: 'url', // Show Content is used to hide/show the Url or Html form field based on the selection.
            Url: '', // The Url the web page back-end uses to display the content.
            Html: null, // If applicable, used to show custom HTML. Cannot be used in conjunction with the Url.
            ShowMobile: false, //If applicable, used to display the mobile version of the URL passed in.
            ShowDelay: null, //Custom delay between displaying the page after it's been loaded.
            RefreshInterval: null, // Custom refresh interval rate in X seconds.
            AllowJavascript: true, // Set to true by default, allows Javascript to be executed on the page.
            Username: '', // Username option, would need to write script passing in credientials.
            Password: '', // Password option, would need to write script passing in credientials.
            Token: '', // Token option, would need to wrtie script passing in credientials.
            JavascriptOnload: '' // Custom JS to be executed once the page loads, can be used to log into authenticated pages.
        }
    };

    // Firebase reference
    var ref = new Firebase("https://eventsboard.firebaseio.com/boards");
    // Create a synchronized array
    var boards = $firebaseArray(ref);
    // Add a board
    $scope.createBoard = function() {
        boards.$add({
                name: $scope.newBoardName
            })
            .then(function(ref) {
                // Get Firebase key
                var boardid = ref.key();
                // Log success
                console.log("added record with id " + id);
                // Give scope the ID


                // Keep board ID to generate unique URL for this board

                // Generate 'url' property for asset object. Use AngularFire + route params
                $scope.page.Value.Url = "https://upcomingevents.firebaseapp.com/#/display/" + boardid;
                $scope.page.Value.boardid = boardid;
                console.log("Set url to " + $scope.page.Value.Url);

                // Give the scope the configured board's object as an array. If this value is true, the dom will hide the new board name input field. 
                // $scope.configuredBoard = newBoardId;
                // Save new asset (this was originally called in the config view.)
                // Comment out this function call during dev
                // $scope.save();
            });
    };


    /** 
     * Error handling function, displays the error returned from any call
     * @param error
     */
    function handleError(error) {
        window.alert('There was an error! ' + error);
    };

    /**
     * Toggles the advanced options, flips value for ng-show/hide within the form
     */
    $scope.toggleAdvanced = function() {
        $scope.showAdvanced = !$scope.showAdvanced;
    };

    /**
     * Loads the account information. $scope value set to it's response so the object's properties are available in the HTML
     */
    $scope.getAccount = function() {
        $enplug.getAccount(function(account) {
            console.log('Loaded account:', account);
            $scope.account = account;
        }, handleError);
    };

    /**
     * Loads the asssets for the application. Since this is a webpage extension, we only want to create a single 'page' asset.
     * Think of this page as the web-page(url, refresh rate, etc) you are passing to be displayed. You do not want to create a new page everytime but
     * rather you want to update the existing page.
     */
    $scope.getAssets = function() {
        $enplug.getAssets(function(assets) {
            console.log('Loaded assets:', assets);
            if (assets.length) {
                $scope.page = assets[0];
                $scope.page.Value = assets[0].Value;
            }
        }, handleError);
    };

    /**
     * Removes the asset completely. Used if the user wants to clear all data rather than updating existing asset.
     * @param assetId
     */
    $scope.removeAsset = function(assetId) {
        $enplug.removeAsset(assetId, function() {
            console.log('Removed asset.');
            $scope.getAssets();
        }, handleError)
    };

    /**
     * If page exists, updates existing page otherwise creates new page.
     */
    $scope.save = function() {
        if ($scope.page && $scope.page.Id) {
            $enplug.updateAsset($scope.page.Id, $scope.page.Value);
        } else {
            $enplug.createAsset('WebURL', $scope.page.Value);
        }
    };

    /**
     * Initialize by loading assets and account for immediate use in the page
     */
    // $scope.getAccount();
    // $scope.getAssets();

};

angular
    .module('eventsBoard')
    .controller('MainCtrl', MainCtrl)
