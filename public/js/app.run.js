/**
 * Created by arjunMitraReddy on 8/6/2016.
 */
(function() {
    "use strict";
    angular.module('amr')
        .run(run);

    run.$inject = ['$rootScope', 'serviceConnectorFactory'];
    /* @ngInject */
    function run($rootScope, serviceConnectorFactory) {
        serviceConnectorFactory.get('/json/universities.json').then(function(data) {
            $rootScope.universities = data;
        }, function() {
            $rootScope.universities = $rootScope.offlineUniversities;
        });
        function registerServiceWorker() {
            if (!navigator.serviceWorker) {
                return;
            }
            return navigator.serviceWorker.register('/sw.js').then((registrationObject) => {
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

        registerServiceWorker();/*.then(initialiseState);
*/
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

        $rootScope._dbPromise = setupIDBStores();
        $rootScope.offlineUniversities = [];
        function setupIDBStores() {
            if (!navigator.serviceWorker) {
                return Promise.resolve();
            }
            return idb.open('universities', 1, (upgradeDb) => {
                var universitiesStore = upgradeDb.createObjectStore('universities', {
                    keyPath: 'University'
                });
            })
        }

        function createUniversitiesIDB() {
            return $.ajax({
                url: 'json/universities.json',
                success: (data) => {
                    var universities = data;
                    return $rootScope._dbPromise.then((db) => {
                        if (!db) return;
                        var universitiesStore = db.transaction('universities', 'readwrite').objectStore('universities');
                        universities.forEach((university) => {
                            universitiesStore.put(university);
                        });
                    });
                }
            });
        }
        createUniversitiesIDB().then(function() {
            getUniversitiesIDB();
        });
        function getUniversitiesIDB() {
            return $rootScope._dbPromise.then((db) => {
                if (!db) return;
                var store = db.transaction('universities').objectStore('universities');
                return store.getAll().then((universities) => {
                    universities.forEach((university) => {
                        $rootScope.offlineUniversities.push(university);
                    });
                });
            });
        }
        (function(window) {
            function PathLoader(el) {
                this.el = el;
                this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
            }
            PathLoader.prototype._draw = function( val ) {
                this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
            };
            PathLoader.prototype.setProgress = function( val, callback ) {
                this._draw(val);
                if( callback && typeof callback === 'function' ) {
                    setTimeout( callback, 200 );
                }
            };
            PathLoader.prototype.setProgressFn = function( fn ) {
                if( typeof fn === 'function' ) { fn( this ); }
            };
            window.PathLoader = PathLoader;
        })(window);

        $rootScope.logBtn = false;
        $rootScope.signBtn = false;
        $rootScope.triggerLogBtn = function() {
            $rootScope.logBtn= true;
            $rootScope.signBtn = false;
        };
        $rootScope.triggerSignBtn = function() {
            $rootScope.logBtn= false;
            $rootScope.signBtn = true;
        };
    }

})();