/**
 * Created by arjunMitraReddy on 8/14/2016.
 */
(function () {
    'use strict';

    angular.module('amr')
        .factory('serviceConnectorFactory', serviceConnectorFactory);
    /* @ngInject */
    serviceConnectorFactory.$inject = [
        '$http'
    ];
    function serviceConnectorFactory($http) {
        return {
            get: getHandler,
            post: postHandler
        };
        function getHandler(url, config) {
            return $http.get(url, config)
                .then(function(response) { return response.data});
        }
        function postHandler(url, payload) {
            return $http.post(url, payload)
                .then(function(response) {return response.data});
        }
    }
})();