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
            var protocol;
            if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
                var ver;
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                    ver = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                }

                ver = ver || [0];

                if (ver[0] >= 6) {
                    protocol = 'maps://';
                } else {
                    protocol = 'http://';

                }
                navigator.geolocation.getCurrentPosition(function(data){
                    if (data.coords) {
                        window.open(
                            'http://maps.google.com/?saddr=' + data.coords.latitude + ',' + data.coords.longitude + '&daddr=' + daddr + '&amp;ll=',
                            '_blank'
                        );
                    }
                }, function() {}, {enableHighAccuracy: true});
            }
            else {
                navigator.geolocation.getCurrentPosition(function(data){
                    if (data.coords) {
                        window.open(
                            'http://maps.google.com/?saddr=' + data.coords.latitude + ',' + data.coords.longitude + '&daddr=' + daddr + '&amp;ll=',
                            '_blank'
                        );
                    }
                }, function() {}, {enableHighAccuracy: true});
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