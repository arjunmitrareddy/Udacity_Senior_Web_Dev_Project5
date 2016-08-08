/**
 * Created by arjunMitraReddy on 8/6/2016.
 */
(function() {
    "use strict";
    angular.module('amr')
        .config(config);

    config.$inject = ['$stateProvider', '$locationProvider'];
    /* @ngInject */
    function config($stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider
            .state('login', {
                url: '/login',
                controller: 'loginController',
                controllerAs: 'lCtrl',
                templateUrl: '/templates/login.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                controller: 'dashboardController',
                controllerAs: 'dCtrl',
                templateUrl: '/templates/dashboard.html'
            });

    }
})();