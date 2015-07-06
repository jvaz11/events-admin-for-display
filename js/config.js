/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/events");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.display', {
            url: "/display",
            templateUrl: "views/display.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.events', {
            url: "/events",
            templateUrl: "views/events.html",
            data: { pageTitle: 'Events' },
            controller: SampleController
        })
        .state('index.settings', {
            url: "/settings",
            templateUrl: "views/events.html",
            data: { pageTitle: 'Settings' },
            controller: SampleController
        })
}
angular
    .module('eventsBoard')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
