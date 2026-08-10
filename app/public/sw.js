const cacheName = "windler-cache-v10";
const staticAssets = [
  "/index.html?v=1",
  "/datenschutz.html?v=1",
  "/favicon.ico?v=1",
  "/manifest.webmanifest?v=1",
];
const cacheableExtensions = [
  ".html",
  ".css",
  ".js",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".webp",
  ".ico",
  ".pdf",
  ".woff",
  ".woff2",
  ".ttf",
  ".json",
  ".xml",
  ".webmanifest",
];

function isCacheableRequest(request) {
  if (request.method !== "GET") {
    return false;
  }

  if (!request.url.startsWith(self.location.origin)) {
    return false;
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  if (
    pathname === "/" ||
    pathname === "/index.html" ||
    pathname === "/datenschutz.html"
  ) {
    return true;
  }

  const normalizedPath = pathname.replace(/[?#].*$/, "").toLowerCase();
  return cacheableExtensions.some((extension) =>
    normalizedPath.endsWith(extension),
  );
}

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

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== cacheName)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (!isCacheableRequest(request)) {
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
