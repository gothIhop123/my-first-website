const CACHE = "pwa-cache-v1";
const ASSETS = [
    "/", 
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/offline.html",

    // icons
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-512x512.png",

    // any other images you want cached:
    "/images/toy-chica-bird.gif",
    "/images/fuckasshampter.jpeg"
];

// Install step
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate step (cleanup)
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE).map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// Fetch handler: offline-first
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return (
                cached ||
                fetch(event.request).catch(() => caches.match("/offline.html"))
            );
        })
    );
});
