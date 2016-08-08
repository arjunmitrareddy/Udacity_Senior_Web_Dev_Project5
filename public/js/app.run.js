/**
 * Created by arjunMitraReddy on 8/6/2016.
 */
(function() {
    "use strict";
    angular.module('amr')
        .run(run);

    run.$inject = ['$state', '$rootScope'];
    /* @ngInject */
    function run($state, $rootScope) {
        function registerServiceWorker() {
            if (!navigator.serviceWorker) {
                return;
            }
            navigator.serviceWorker.register('/sw.js').then((registrationObject) => {
                if (!navigator.serviceWorker.controller) {
                    return;
                }
                if (registrationObject.waiting) { //means service worker is ready to be updated
                    update(registrationObject.waiting);
                }
                if (registrationObject.installing) {
                    trackInstall(registrationObject.installing);
                    return;
                }
                registrationObject.addEventListener('updatefound', () => {
                    trackInstall(registrationObject.installing);
                });
                navigator.serviceWorker.controller.addEventListener('controllerchange', () => {
                    window.location.reload();
                });
            });
        }

        registerServiceWorker();

        function trackInstall(worker) {
            worker.addEventListener('statechange', () => {
                if (worker.state == 'installed') {
                    update(worker);
                }
            })
        }

        function update(worker) {
            worker.postMessage({skipWait: true});
        }

    }


})();