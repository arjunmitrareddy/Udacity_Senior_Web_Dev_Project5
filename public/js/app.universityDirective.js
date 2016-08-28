/**
 * Created by arjunMitraReddy on 8/14/2016.
 */
(function() {
    'use strict';

    angular.module('amr')
        .directive('university', university);

    function university() {
        return {
            restrict: 'E',
            scope: {
                university: '=',
                chance: '='
            },
            templateUrl: '/templates/university.html',
            link: link
        };
    }

    function link(scope, elem, attrs) {
        scope.getDirections = function(university) {
            var daddr = university;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(data){
                    if (data.coords) {
                        window.open(
                            'https://maps.google.com/maps?saddr=' + data.coords.latitude + ',' + data.coords.longitude + '&daddr=' + daddr,
                            '_system'
                        );
                    }
                });
            }
        };


        scope.openWebsite = function(website) {
            window.open(
                website,
                '_blank'
            );
        }
    }
})();