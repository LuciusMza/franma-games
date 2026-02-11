const CACHE_NAME = 'yonunca-v2-features';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalación: Guardamos los archivos en la memoria del celular
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Peticiones: Si el archivo está guardado, lo usamos; si no, lo bajamos
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});