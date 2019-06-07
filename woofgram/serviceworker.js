/* jshint esversion:6 */

let CACHE_NAME = 'site-cache';
let urlsToCache = [
  '.',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js', 
  'https://fonts.gstatic.com/s/bungeeshade/v4/DtVkJxarWL0t2KdzK3oI_jkc6SjTjQJElg.woff2',
  'upload.php',
  'paw.png',
  'newuser.php',
  'newuser.css',
  'main.php',
  'main.js',
  'main.css',
  'index.php',
  'index.css',
  'functions.php',
  'avatar.png',
  'sidebar.js',
  'img.jpg',
  'weimaraner-1381186_640.jpg',
  'rottweiler-1785760_640.jpg',
  'pug-801826_640.jpg',
  'pet-423398_640.jpg',
  'dog-1020790_640.jpg',
  'dog-2785074_640.jpg',
  'dog-1224267_640.jpg',
  'dog-1149964_640.jpg',
  'dog-1123016_640.jpg',

  
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Using content from SW cache');
      //console.log(urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});