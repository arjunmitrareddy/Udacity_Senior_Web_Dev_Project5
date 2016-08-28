/**
 * Created by arjunMitraReddy on 8/6/2016.
 */
(function() {
    "use strict";
    angular.module('amr')
        .config(config);

    config.$inject = ['$stateProvider', '$locationProvider', '$mdThemingProvider'];
    /* @ngInject */
    function config($stateProvider, $locationProvider, $mdThemingProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider
            .state('welcome', {
                url: '/',
                controller: 'welcomeController',
                controllerAs: 'wCtrl',
                templateUrl: '/templates/welcome.html'
            })
            .state('login', {
                url: '/login',
                controller: 'loginController',
                controllerAs: 'lCtrl',
                templateUrl: '/templates/login.html'
            })
            .state('univ', {
                url: '/univ',
                controller: 'univResController',
                templateUrl: '/templates/univRes.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                controller: 'dashboardController',
                controllerAs: 'dCtrl',
                templateUrl: '/templates/dashboard.html'
            });
        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    }
})();