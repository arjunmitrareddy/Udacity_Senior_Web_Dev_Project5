/**
 * Created by arjunMitraReddy on 8/28/2016.
 */
(function() {
    "use strict";
    angular.module('amr')
        .controller('univResController', univResController);

    univResController.$inject = ['$state', '$rootScope'];

    function univResController($state, $rootScope) {
        if (!$rootScope.score || $rootScope.score < 280 || $rootScope.score > 340) {
            $state.go('dashboard');
        }
    }
})();