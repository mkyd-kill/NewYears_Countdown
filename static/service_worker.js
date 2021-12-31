// caching all pages
// individual pages and all pages
const CACHE_NAME = 'countdown-V3';

// calling the install Event
self.addEventListener('install', async function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log("Service Worker Installed");
        })
    );
});

// Calling the Fetch Event
self.addEventListener('fetch', function(event) {
    event.respondeWith(
        fetch(event.request)
        .then(async function(response) {
            if (response) {
                return response;
            }

            return fetch(event.request).then(
                function(response) {
                    // Check if we received a valid message
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    // Clonning the response.
                    //make clone/copy of respons
                    const resClone = res.clone();
                    //open cache
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            //add response to cache
                            cache.put(event.request, resClone);
                        });
                    return response;
                }
            );
        }).catch(err => caches.match(event.request).then(res => res))
    );
});

// call the activate Event
self.addEventListener('activate', function(event) {
    var cacheAllowlist = [
        'year-count-V2',
        'flask-count-V2'
    ];

    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});