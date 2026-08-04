/*
=========================================================
Los Caris Play
service-worker.js
Versión Alpha 0.1
=========================================================
*/

const CACHE_NAME = "loscarisplay-v1";

const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/variables.css",
    "./css/reset.css",
    "./css/app.css",
    "./css/components.css",
    "./css/animations.css",

    "./js/app.js",
    "./js/ui.js",
    "./js/timer.js",

    "./assets/logo.svg",

    "./assets/icon-192.png",
    "./assets/icon-512.png",

    "./assets/audio/bell.mp3"

];

/*=========================================
    INSTALACIÓN
=========================================*/

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(FILES_TO_CACHE))

    );

    self.skipWaiting();

});

/*=========================================
    ACTIVACIÓN
=========================================*/

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

/*=========================================
    PETICIONES
=========================================*/

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                return response || fetch(event.request);

            })

    );

});