(function() {
    "use strict";
    angular.module('amr')
        .controller('welcomeController', welcomeController);

    welcomeController.$inject = [];

    function welcomeController() {
        var support = { animations : Modernizr.cssanimations },
            container = document.getElementById( 'ip-container' ),
            header = container.querySelector( 'header.ip-header' ),
            loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
            animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
            animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

        function init() {
            var onEndInitialAnimation = function() {
                if( support.animations ) {
                    this.removeEventListener( animEndEventName, onEndInitialAnimation );
                }

                startLoading();
            };
            window.addEventListener( 'scroll', noscroll );
            classie.add( container, 'loading' );
            if( support.animations ) {
                container.addEventListener( animEndEventName, onEndInitialAnimation );
            }
            else {
                onEndInitialAnimation();
            }
        }
        function startLoading() {
            var simulationFn = function(instance) {
                var progress = 0,
                    interval = setInterval( function() {
                        progress = Math.min( progress + Math.random() * 0.1, 1 );
                        instance.setProgress( progress );
                        if( progress === 1 ) {
                            classie.remove( container, 'loading' );
                            classie.add( container, 'loaded' );
                            clearInterval( interval );
                            var onEndHeaderAnimation = function(ev) {
                                if( support.animations ) {
                                    if( ev.target !== header ) return;
                                    this.removeEventListener( animEndEventName, onEndHeaderAnimation );
                                }
                                classie.add( document.body, 'layout-switch' );
                                window.removeEventListener( 'scroll', noscroll );
                            };
                            if( support.animations ) {
                                header.addEventListener( animEndEventName, onEndHeaderAnimation );
                            }
                            else {
                                onEndHeaderAnimation();
                            }
                        }
                    }, 80 );
            };
            loader.setProgressFn( simulationFn );
        }
        function noscroll() {
            window.scrollTo( 0, 0 );
        }
        init();
    }
})();
/*
 * Copyright 2014, Codrops for Animations
 * http://www.codrops.com
 */