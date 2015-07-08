function config($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'     
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
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
    
      //   resolve: {
      //     currentAuth: function(Auth) {
      //       return Auth.requireAuth();
      //     }
      //   }
      // })
      .otherwise({
        redirectTo: '/login'
      })
  };




angular
    .module('eventsBoard')
    .config(config)
     .run["$rootScope", "$location", (function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the login page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
  })]  


// function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
//     $urlRouterProvider.otherwise("/login");

//     $ocLazyLoadProvider.config({
//         // Set to true if you want to see what and when is dynamically loaded
//         debug: true
//     });

//     $stateProvider

//         .state('index', {
//             abstract: true,
//             url: "/index",
//             templateUrl: "views/common/content.html"
//         })
//         .state('index.display', {
//             url: "/display",
//             templateUrl: "views/display.html",
//             data: {
//                 pageTitle: 'Example view'
//             }
//         })
//         .state('index.events', {
//             url: "/events",
//             templateUrl: "views/events.html",
//             data: {
//                 pageTitle: 'Events'
//             },
//             controller: MainCtrl
//         })
//         .state('index.settings', {
//             url: "/settings",
//             templateUrl: "views/events.html",
//             data: {
//                 pageTitle: 'Settings'
//             },
//             controller: MainCtrl
//         })
//         .state('register', {
//             url: "/register",
//             templateUrl: "views/register.html",
//             data: {
//                 pageTitle: 'Register',
//                 specialClass: 'gray-bg'
//             },
//             controller: AuthCtrl
//         })
//         .state('login', {
//             url: "/login",
//             templateUrl: "views/login.html",
//             data: {
//                 pageTitle: 'Login',
//                 specialClass: 'gray-bg'
//             },
//             controller: AuthCtrl
//         })
// }
// angular
//     .module('eventsBoard')
//     .config(config)
//     .run(function($rootScope, $state) {
//         $rootScope.$state = $state;
//     });




// // old .run
// // .run(["$rootScope", "$state", "$location", function($rootScope, $state, $location) {
// //     $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
// //         // We can catch the error thrown when the $requireAuth promise is rejected
// //         // and redirect the user back to the home page
// //         if (error === "AUTH_REQUIRED") {
// //             $state.go("login");
// //         }
// //     });
// // }]);
