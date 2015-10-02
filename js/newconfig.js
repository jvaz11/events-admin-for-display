// angular.run(function($rootScope, $location) {
//     $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
//       // We can catch the error thrown when the $requireAuth promise is rejected
//       // and redirect the user back to the login page
//       if (error === "AUTH_REQUIRED") {
//       	console.log("auth required error")
//         $location.path("/login");
//       }
//     });
//   })  
//   .config(function ($routeProvider) {
//     $routeProvider      
//       .when('/', {
//         templateUrl: 'views/events.html',
//         controller: 'MainCtrl'     
//       })
//       .when('/display', {
//         templateUrl: 'views/display.html',
//         controller: 'MainCtrl'
//       })
//       .when('/register', {
//         templateUrl: 'views/register.html',
//         controller: 'AuthCtrl'
//       })
//       .when('/login', {
//         templateUrl: 'views/login.html',
//         controller: 'AuthCtrl'
//       })
//       .when('/events', {
//         templateUrl: 'views/events.html',
//         controller: 'MainCtrl',
//         resolve: {
//           currentAuth: function(Auth) {
//             return Auth.requireAuth();
//           }
//         }
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });