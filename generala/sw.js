const CACHE_NAME = 'generala-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// INSTALACIÓN
self.addEventListener('install', (e) => {
  // Esta línea fuerza al navegador a usar este SW inmediatamente
  self.skipWaiting(); 
  
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// ACTIVACIÓN (Limpiar cachés viejos)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => {
        if (k !== CACHE_NAME) return caches.delete(k);
      }));
    })
  );
  // Reclamar control de la página inmediatamente
  return self.clients.claim();
});

// INTERCEPTAR PETICIONES (Modo Offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});