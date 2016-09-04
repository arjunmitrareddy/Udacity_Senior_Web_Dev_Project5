/**
 * Created by arjunMitraReddy on 8/6/2016.
 */
var staticCache = 'transport-info-v1';
var imagesCache = 'transport-imgs';

var allCaches = [
    staticCache,
    imagesCache
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        Promise.all(
            [
                caches.open(staticCache).then(function(cache) {
                    return cache.addAll([
                        '/',
                        'index.html',
                        '/login',
                        '/dashboard',
                        '/univ',
                        '/js/lib.js',
                        '/js/app.js',
                        '/styles/lib.css',
                        '/styles/style.css',
                        '/manifest.json',
                        '/json/universities.json'
                    ])
                }),
                caches.open(imagesCache).then(function(cache) {
                    return cache.addAll([
                        'imgs/favicon.png',
                        'fonts/FontAwesome.otf',
                        'fonts/fontawesome-webfont.eot',
                        'fonts/fontawesome-webfont.svg',
                        'fonts/fontawesome-webfont.ttf?v=4.6.3',
                        'fonts/fontawesome-webfont.woff?v=4.6.3',
                        'fonts/fontawesome-webfont.woff2?v=4.6.3',
                        'imgs/48.png',
                        'imgs/96.png',
                        'imgs/128.png',
                        'imgs/144.png',
                        'imgs/192.png',
                        'imgs/256.png',
                        'imgs/384.png',
                        'imgs/512.png',
                        'imgs/logo.svg',
                        'imgs/logo2.png',
                        'imgs/preloader.gif',
                        'imgs/univ.png',
                    ])
                })
            ]
        )
    )
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return !allCaches.includes(cacheName);
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname.startsWith('/imgs/')) {
            event.respondWith(serveAssets(event.request, imagesCache));
            return;
        }
        if (requestUrl.pathname.startsWith('/fonts/')) {
            event.respondWith(serveAssets(event.request, imagesCache));
            return;
        }
        if (requestUrl.pathname.startsWith('/js/')) {
            event.respondWith(serveAssets(event.request, staticCache));
            return;
        }
        if (requestUrl.pathname.startsWith('/css/')) {
            event.respondWith(serveAssets(event.request, staticCache));
            return;
        }
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});

self.addEventListener('message', function(event) {
    if (event.data.skipWait) {
        self.skipWaiting();
    }
});

function serveAssets(request, cacheName) {
    return caches.open(cacheName).then(function(cache) {
        return cache.match(request).then(function(response) {
            if (response) return response;
            return fetch(request).then(function(response) {
                cache.put(request, response.clone());
                return response;
            });
        });
    });
}