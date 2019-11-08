// Cache names

var dataCacheName = '';

var cacheName = '';
// Application shell files to be cached

var filesToCache = [ '/','/index.html', 'js/app.js'];

self.addEventListener('install', event => {

      console.log('installing....')

      event.waitUntil(

             caches.open(cacheName).then(function (cache) {

                     console.log('Caching app shell')

                     return cache.addAll(filesToCache)
                     self.skipWaiting();

              })

      )
})

self.addEventListener('activate', event => {

  console.log('activating......')
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('ready to handle fetches now');
    })
  );
});



// self.addEventListener('fetch', event => {
//   // Skip cross-origin requests, like those for Google Analytics.
//   if (event.request.url.startsWith(self.location.origin)) {
//     event.respondWith(
//       caches.match(event.request).then(cachedResponse => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         return caches.open(RUNTIME).then(cache => {
//           return fetch(event.request).then(response => {
//             // Put a copy of the response in the runtime cache.
//             return cache.put(event.request, response.clone()).then(() => {
//               return response;
//             });
//           });
//         });
//       })
//     );
//   }
// });