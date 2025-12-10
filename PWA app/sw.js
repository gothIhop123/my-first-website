const CACHE_NAME = "pwa-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/fanfic.html",
  "/feet.html",
  "/database.html",
  "/manifest.json",

  "/css/style.css",
  "/css/database.css",
  "/css/fanfic.css",
  "/css/feet.css",

  "/js/app.js",
  "/js/database.js",

  "/images/dice1.png",
  "/images/dice2.png",
  "/images/dice3.png",
  "/images/dice4.png",
  "/images/dice5.png",
  "/images/dice6.png",

  "/images/toy-chica-bird.gif",
  "/images/rekt.gif",
  "/images/fuckasshampter.jpeg",

  "/images/chica-jumpscare-sound-frtlcr.mp3",
  "/images/loud-screech-noise.mp3",
  "/images/snoop-dogg-base-instrumental-mp3cut.mp3",

  "/images/icons/icon-192x192.png",
  "/images/icons/icon-512x512.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});