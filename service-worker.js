/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-6b2923b';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./resources.html","./vladar_001.html","./vladar_002.html","./vladar_005.html","./vladar_006.html","./vladar_007.html","./vladar_008.html","./vladar_009.html","./vladar_010.html","./vladar_011.html","./vladar_012.html","./vladar_013.html","./vladar_014.html","./vladar_015.html","./vladar_016.html","./vladar_017.html","./vladar_018.html","./vladar_019.html","./vladar_020.html","./vladar_021.html","./vladar_022.html","./vladar_023.html","./vladar_024.html","./vladar_025.html","./vladar_026.html","./vladar_027.html","./vladar_028.html","./vladar_029.html","./vladar_030.html","./vladar_031.html","./vladar_032.html","./vladar_033.html","./vladar_034.html","./vladar_035.html","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/index.xml","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
