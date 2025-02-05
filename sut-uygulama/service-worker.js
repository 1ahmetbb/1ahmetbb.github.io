const cacheName = "sut-miktarlari-oyunu-v1";
const assetsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./assets/farm-illustration.png"
];

// Install Event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("Caching files");
            return cache.addAll(assetsToCache);
        })
    );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});