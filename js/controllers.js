/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl() {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

};


function SampleController($scope, $firebaseArray, $location, $log) {
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

// timepicker


  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };



            // Add events/slides to a board ***

            // get boardId from asset object (hardcode during dev)
            var boardid = '-JstFnLEGV0qJ_1u2vue';

            var slidesref = new Firebase("https://eventsboard.firebaseio.com/boards/" + boardid + "/slides");

            $scope.eventslides = $firebaseArray(slidesref);

            var events = $scope.eventslides;


            $scope.saveEvent = function(event) {
                // $scope.event.date = 
                var newEvent = {};
                newEvent.name = $scope.newEvent.name;
                var newtime = $scope.mytime;
                newEvent.time = newtime.getTime();
                // newEvent.date = $scope.newEvent.date.toString();
                // newEvent.fullDate = $filter('date')($scope.newEvent.date, 'fullDate');
                // newEvent.dateTime = $filter('date')($scope.newEvent.date, 'yyyy-MM-dd');
                // newEvent.src = "http://i.imgur.com/zcdzHup.jpg?1";
                events.$add(newEvent);
                $scope.newEvent = {};

            };

            $scope.remove = function(event) {
                if (confirm('Are you sure?')) {
                    if (event) {
                        $scope.events.$remove(event);
                    } else {
                        $scope.events = $scope.events.filter(
                            function(event) {
                                return !event.selected;
                            }
                        );
                        $scope.selectAll = false;
                    }
                }
            };

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


// datepicker 

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // };

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

  $scope.format = 'MM/dd/yyyy';

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };


        };



angular
    .module('eventsBoard')
    .controller('MainCtrl', MainCtrl)
    .controller('SampleController', SampleController)