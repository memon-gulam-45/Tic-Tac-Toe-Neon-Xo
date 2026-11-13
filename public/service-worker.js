const CACHE_NAME = "neon-xo-v7";

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/Icon-48.png",
  "/icons/Icon-72.png",
  "/icons/Icon-96.png",
  "/icons/Icon-144.png",
  "/icons/Icon-192.png",
  "/icons/Icon-512.png",
  "/sounds/click.mp3",
  "/sounds/count.mp3",
  "/sounds/draw.mp3",
  "/sounds/moye-moye.mp3",
  "/sounds/turnO.mp3",
  "/sounds/turnX.mp3",
  "/sounds/win.mp3",
];

// Install: Cache critical static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Stale-while-revalidate for navigation, Cache-first for audio & icons
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests (e.g. Google ads/analytics)
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Audio and static icons: Cache First with network fallback
  if (url.pathname.startsWith("/sounds/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Next.js static assets and pages: Stale-While-Revalidate with offline fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and requesting a page, return cached root
          if (request.mode === "navigate") {
            return caches.match("/");
          }
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
