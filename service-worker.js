const CACHE_NAME = "neon-xo-v4";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  // sounds
  "./sounds/click.mp3",
  "./sounds/turnO.mp3",
  "./sounds/turnX.mp3",
  "./sounds/win.mp3",
  "./sounds/draw.mp3",
  "./sounds/count.mp3",

  // icons
  "./icons/Icon-192.png",
  "./icons/Icon-512.png",
];

// Install new service worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }),
  );

  // Activate the new service worker immediately
  self.skipWaiting();
});

// Delete old cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );

  // Take control of all open pages immediately
  self.clients.claim();
});

// Serve cached files first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
