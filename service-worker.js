var CACHE_NAME="methodtutor-20221030174315",urlsToCache=[self.registration.scope,self.registration.scope+"about.svg",self.registration.scope+"app.js",self.registration.scope+"down.svg",self.registration.scope+"favicon.svg",self.registration.scope+"left.svg",self.registration.scope+"manifest.json",self.registration.scope+"right.svg",self.registration.scope+"style.css",self.registration.scope+"tutor.svg",self.registration.scope+"x.svg"];self.addEventListener("install",(function(e){e.waitUntil(caches.open(CACHE_NAME).then((function(e){return e.addAll(urlsToCache)})))})),self.addEventListener("fetch",(function(e){"GET"===e.request.method&&e.respondWith(caches.match(e.request).then((function(t){return t||fetch(e.request)})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.filter((function(e){return e!==CACHE_NAME})).map((function(e){return caches.delete(e)})))})))}));