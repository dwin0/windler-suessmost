const cacheName = "windler-cache-v5";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/datenschutz.html",
          "/favicon.ico",
          "/assets/dist/main.css",
          "/assets/dist/main.js",
          "/assets/dist/fontello.woff2",
          "/assets/dist/roboto-v18-latin-regular.woff2",
          "/assets/dist/roboto-v18-latin-900.woff2",
          "/assets/images/apples-header_tiny.jpg",
          "/assets/images/apples-header_rotate_tiny.jpg",
          "/assets/images/products/aepfel-am-baum.jpg",
          "/assets/images/products/apfelbluete.jpg",
          "/assets/images/products/frischer-apfelsaft-tropft-vom-band.jpg",
          "/assets/images/products/mobile-bandpresse-auf-anhaenger.jpg",
          "/assets/images/products/obstanlage.jpg",
          "/assets/images/products/trester-rutscht-vom-band.jpg",
          "/assets/images/products/unsere-produkte.jpg",
          "/assets/images/medaille-ostschweizer-fruchtsaftprämierung-2023.jpeg",
          "/assets/pdfs/Rangliste-1-Ostschweizer-Fruchtsaftpraemierung.pdf",
          "/assets/pdfs/gold-auszeichnung-2013-min.pdf",
          "/assets/pdfs/gold-auszeichnung-2013-vorschau.jpg",
          "/assets/pdfs/gold-auszeichnung-2018-min.pdf",
          "/assets/pdfs/gold-auszeichnung-2018-vorschau.jpg",
        ])
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .open(cacheName)
      .then((cache) => cache.match(event.request, { ignoreSearch: true }))
      .then((response) => response || fetch(event.request))
  );
});
