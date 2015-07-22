function run($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the login page
        if (error === "AUTH_REQUIRED") {
            console.log("auth required error")
            $location.path("/register");
        }
    });
}

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/events.html',
            controller: 'MainCtrl',
            resolve: {
                currentAuth: function(Auth) {
                    return Auth.requireAuth();
                }
            }
        })
        .when('/display', {
            templateUrl: 'views/display.html',
            controller: 'MainCtrl',
            resolve: {
                currentAuth: function(Auth) {
                    return Auth.requireAuth();
                }
            }
        })
        .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'MainCtrl',
            resolve: {
                currentAuth: function(Auth) {
                    return Auth.requireAuth();
                }
            }
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl'
        })
        .when('/sdkconfig', {
            templateUrl: 'views/enplugsdkconfig.html',
            controller: 'SdkCtrl'
        })
        .when('/events', {
            templateUrl: 'views/events.html',
            controller: 'MainCtrl',
            resolve: {
                currentAuth: function(Auth) {
                    return Auth.requireAuth();
                }
            }
        })
        .otherwise({
            redirectTo: '/',
            resolve: {
                currentAuth: function(Auth) {
                    return Auth.requireAuth();
                }
            }
        });
};

angular
    .module('eventsBoard')
    .config(config)
    .run(run)
