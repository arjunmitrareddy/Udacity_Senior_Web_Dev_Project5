/**
 * Created by arjunMitraReddy on 8/6/2016.
 */
(function() {
    "use strict";
    angular.module('amr')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$state', '$rootScope'];

    function dashboardController($state, $rootScope) {
        var dCtrl = this;
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            var root = document.getElementsByTagName('html')[0];
            root.setAttribute('class', 'ff');
        }
        dCtrl.showingRes = false;
        dCtrl.openSearchBox = function() {
            $(function() {
                $('#search').addClass('open');
                $('#search > form > input[type="search"]').focus();
            });
        };
        dCtrl.openSearchBox();
        dCtrl.closeSearchBox = function() {
            $(function() {
                $('#search, #search button.close').on('click keyup', function (event) {
                    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                        $(this).removeClass('open');
                    }
                });
            });
        };
        dCtrl.processUniversities = function() {
            dCtrl.universities = [];
            dCtrl.preMaxUniversities = [];
            dCtrl.preMax2Universities = [];
            var maxDiff = Infinity;
            var preMaxDiff = Infinity;
            var preMaxDiff2 = Infinity;
            var diff = 0;
            var universities = $rootScope.universities ? $rootScope.universities : $rootScope.offlineUniversities;
            for (var i=0; i<universities.length; i++) {
                diff = Math.abs($rootScope.score - universities[i].Score);
                if (diff < maxDiff) {
                    preMaxDiff2 = preMaxDiff;
                    preMaxDiff = maxDiff;
                    maxDiff = diff;
                    dCtrl.preMax2Universities = [];
                    dCtrl.preMax2Universities = dCtrl.preMaxUniversities.map(function(univ) {
                        return {u: univ.u, c: "Hard"};
                    });
                    dCtrl.preMaxUniversities = [];
                    dCtrl.preMaxUniversities = dCtrl.universities.map(function(univ) {
                        return {u: univ.u, c: "Moderate"};
                    });
                    dCtrl.universities = [];
                }
                if (diff == maxDiff) {
                    dCtrl.universities.push({u: universities[i], c: "Safe"});
                }
            }
            dCtrl.preMaxUniversities = dCtrl.preMaxUniversities.concat(dCtrl.preMax2Universities);
            dCtrl.universities = dCtrl.universities.concat(dCtrl.preMaxUniversities);
            $rootScope.processedUniversities = dCtrl.universities;
        };

        $rootScope.score = null;
        dCtrl.showColleges = function() {
            dCtrl.closeSearchBox();
            dCtrl.showingRes = true;
            dCtrl.processUniversities();
            $state.go('univ');
        };
    }
})();