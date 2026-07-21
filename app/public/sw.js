const cacheName = "windler-cache-v9";
const staticAssets = [
  "/",
  "/index.html",
  "/datenschutz.html",
  "/favicon.ico",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then(async (cache) => {
      for (const url of staticAssets) {
        try {
          await cache.add(url);
        } catch (error) {
          console.warn(`Skipping service worker cache entry: ${url}`, error);
        }
      }

      await self.skipWaiting();
    }),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      const networkResponse = await fetch(request);

      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }

      return networkResponse;
    }),
  );
});
