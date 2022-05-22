var CACHE_NAME = 'methodtutor-{{DATE}}';
var urlsToCache = [
    self.registration.scope,
    self.registration.scope + 'about.svg',
    self.registration.scope + 'app.js',
    self.registration.scope + 'down.svg',
    self.registration.scope + 'favicon.svg',
    self.registration.scope + 'left.svg',
    self.registration.scope + 'manifest.json',
    self.registration.scope + 'right.svg',
    self.registration.scope + 'style.css',
    self.registration.scope + 'tutor.svg',
    self.registration.scope + 'x.svg'
];

self.addEventListener( 'install', function( event ) {
    event.waitUntil(
        caches.open( CACHE_NAME )
          .then( function( cache ) {
            return cache.addAll( urlsToCache );
          } )
      );
} );

self.addEventListener( 'fetch', function( event ) {
    if( event.request.method !== 'GET' ) {
        return;
    }
    event.respondWith(
      caches.match( event.request )
        .then(function( response ) {
            return response || fetch(event.request);
        } )
    );
} );

self.addEventListener( 'activate', function( event ) {
    event.waitUntil(
      caches.keys()
        .then( function( keys ) {
            return Promise.all(
                keys.filter( function( key ) { return key !== CACHE_NAME; } )
                    .map(    function( key ) { return caches.delete( key ); } )
            );
        } )
    );
} );
